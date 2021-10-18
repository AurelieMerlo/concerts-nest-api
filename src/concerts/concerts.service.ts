import { orderBy, isEmpty } from 'lodash';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, In, Repository } from 'typeorm';
import { Concerts } from './concerts.entity';
import { GetConcertsDto } from './dto/get-concerts.dto';
import { Venues } from 'src/venues/venues.entity';

export type Point = {
  type: string,
  coordinates: {
    lg: number,
    lat: number,
  }
}

@Injectable()
export class ConcertsService {
  constructor(
    @InjectRepository(Concerts)
    private readonly concertsRepository: Repository<Concerts>,
  ) {}

  findAll(): Promise<Concerts[]> {
    return this.concertsRepository.find();
  };

  async findBy(params: GetConcertsDto): Promise<Concerts[]> {
    const paramBandIds = params.bandIds || '';
    const geoSpatialParams = [params.longitude, params.latitude, params.radius];

    let queryResult;
    
    if (!isEmpty(paramBandIds)) {
      const bandIds = paramBandIds.split(',');
      const query = {
        where: {
          bandId: In(bandIds),
        },
        relations: ['band', 'venue'],
      }  

      queryResult = await this.concertsRepository.find(query);
    };

    if (!geoSpatialParams.includes(undefined)) {
      const longitude = params.longitude
      const latitude = params.latitude
      const radius = params.radius

      let origin: Point = {
        type: "Point",
        coordinates: {
          lg: longitude, 
          lat: latitude,
        }
      };

      queryResult = await getConnection()
                          .getRepository(Venues)
                          .createQueryBuilder('venues')
                          .where(':lg', { lg: longitude })
                          .getMany();
    }

    const concertsSortedByDate = orderBy(queryResult, [concert => new Date(concert.date)], ['desc']);
    
    return concertsSortedByDate;
  }
}
