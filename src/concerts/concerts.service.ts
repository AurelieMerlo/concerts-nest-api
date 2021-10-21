import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, In, ObjectType, Repository } from 'typeorm';
import { Concerts } from './concerts.entity';
import { Venues } from 'src/venues/venues.entity';
import { ConcertDto } from './dto/concert.dto';
import { Coordinates } from '../types';

@Injectable()
export class ConcertsService {
  constructor(
    @InjectRepository(Concerts)
    private concertsRepository: Repository<Concerts>
  ) {}

  async searchByBands(
    bandIds: string,
  ): Promise<ConcertDto[]> {
    const ids = bandIds.split(',').map(id => parseInt(id));

    const query = {
      where: {
        bandId: In(ids),
      },
      relations: ['band', 'venue'],
    }

    const result = await this.concertsRepository.find(query);
      
    return result;
  }

  async searchByLocation(
    location: Coordinates
  ): Promise<ConcertDto[]> {
      const longitude = location.longitude;
      const latitude = location.latitude;
      const radius = location.radius;

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

      const matchedConcerts = await getConnection()
                                .getRepository(Concerts)
                                .createQueryBuilder('concerts')
                                .leftJoinAndSelect("concerts.band", "band")
                                .leftJoinAndSelect("concerts.venue", "venue")
                                .where('concerts.venueId IN (:...matchedVenuesIds)', { matchedVenuesIds: matchedVenuesIds})
                                .getMany();
                                // .getQuery(); decomment this for debug
      
    return matchedConcerts;
  }
}
