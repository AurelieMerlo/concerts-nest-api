import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, In, Repository } from 'typeorm';
import { Concerts } from './concerts.entity';
import { Venues } from 'src/venues/venues.entity';
import { ConcertsDto } from './dto/concerts.dto';
import { isEmpty } from 'lodash';

@Injectable()
export class ConcertsService {
  constructor(
    @InjectRepository(Concerts)
    private readonly concertsRepository: Repository<Concerts>,
  ) {}

  findAll(): Promise<Concerts[]> {
    return this.concertsRepository.find();
  };

  async findByBands(@Param() { bandIds }: ConcertsDto): Promise<Concerts[]> {    
    const ids = bandIds.split(',');
    const query = {
      where: {
        bandId: In(ids),
      },
      relations: ['band', 'venue'],
    }

    const result = await this.concertsRepository.find(query);

    if(isEmpty(result)) {
      throw new HttpException('No result found', HttpStatus.NO_CONTENT);
    };
      
    return result;
  }

  async findByLocation(@Param() { longitude, latitude, radius }: ConcertsDto): Promise<Concerts[]> {
    const origin = {
      type: "Point",
      coordinates: [parseFloat(longitude), parseFloat(latitude)]
    };

    const matchedVenuesIds = await getConnection()
                                    .getRepository(Venues)
                                    .createQueryBuilder('venues')
                                    .select('venues.id')
                                    .addSelect("SUBSTRING(3959 * acos (cos ( radians(78.3232) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(65.3234) ) + sin ( radians(78.3232) ) * sin( radians( lat ) ))))", "distance")
                                    .having("distance <= :radius", { radius: radius })
                                    .setParameters({
                                      origin: JSON.stringify(origin),
                                      radius: parseInt(radius)*1000 //KM conversion
                                    })
                                    .getMany();
                                    // .getQuery(); decomment this for debug

                                    console.log(matchedVenuesIds);

    const matchedConcerts = await getConnection()
                                .getRepository(Concerts)
                                .createQueryBuilder('concerts')
                                .leftJoinAndSelect("concerts.band", "band")
                                .leftJoinAndSelect("concerts.venue", "venue")
                                .where('concerts.venueId IN (:...matchedVenuesIds)', { matchedVenuesIds: matchedVenuesIds})
                                .getMany();
                                // .getQuery(); decomment this for debug

    if(matchedConcerts.length === 0) {
      throw new HttpException('No result found', HttpStatus.NO_CONTENT);
    };
      
    return matchedConcerts;
  }
}
