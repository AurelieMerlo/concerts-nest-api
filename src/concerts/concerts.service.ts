import { orderBy } from 'lodash';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, In, Repository } from 'typeorm';
import { Concerts } from './concerts.entity';
import { GetConcertsDto } from './dto/get-concerts.dto';
import { Venues } from 'src/venues/venues.entity';

@Injectable()
export class ConcertsService {
  constructor(
    @InjectRepository(Concerts)
    private readonly concertsRepository: Repository<Concerts>,
  ) {}

  findAll(): Promise<Concerts[]> {
    return this.concertsRepository.find();
  };

  async findByBands(params: GetConcertsDto): Promise<Concerts[]> {
    const paramBandIds = params.bandIds || '';
    
    const bandIds = paramBandIds.split(',');
    const query = {
      where: {
        bandId: In(bandIds),
      },
      relations: ['band', 'venue'],
    }

    const result = await this.concertsRepository.find(query);

    if(result.length === 0) {
      throw new HttpException('No result found', HttpStatus.NO_CONTENT);
    };
      
    return result;
  }

  async findByLocation(params: GetConcertsDto): Promise<Concerts[]> {
    const longitude = params.longitude;
    const latitude = params.latitude;
    const radius = params.radius;

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

    const matchedConcerts = await getConnection()
                                .getRepository(Concerts)
                                .createQueryBuilder('concerts')
                                .leftJoinAndSelect("concerts.band", "band")
                                .leftJoinAndSelect("concerts.venue", "venue")
                                .where('concerts.venueId IN (:...matchedVenuesIds)', { matchedVenuesIds: matchedVenuesIds})
                                .getMany();
                                // .getQuery();

    if(matchedConcerts.length === 0) {
      throw new HttpException('No result found', HttpStatus.NO_CONTENT);
    };
      
    return matchedConcerts;
  }
}
