import { Controller, Get, Query, ClassSerializerInterceptor, UseInterceptors, HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { orderBy } from 'lodash';
import { allMandatoriesAttributes, serializedItem } from 'src/utils';
import { ConcertsService } from './concerts.service';
import { plainToClass } from 'class-transformer';
import { Concerts } from './concerts.entity';
import { ConcertDto } from './dto/concert.dto';
import { Coordinates, Result } from '../types';
import { isEmpty } from 'lodash';

@Controller('concerts')
@UseInterceptors(ClassSerializerInterceptor)
export class ConcertsController {
  constructor(private readonly concertsService: ConcertsService) {}
  
  @Get()
  async list(
    @Query('bandIds') bandIds?: string,
    @Query('location') location?: Coordinates,
  ) {
    let result: ConcertDto[];

    if (bandIds) {
      if (isEmpty(bandIds)) {
        throw new HttpException('Missing value in parameter "bandIds"', HttpStatus.BAD_REQUEST);
      }
      if (typeof bandIds !== 'string') {
        throw new HttpException('Values in parameter "bandIds" must be strings', HttpStatus.BAD_REQUEST);
      }
      result = await this.concertsService.searchByBands(bandIds);
    } 
    
    if (location) {
      if (typeof location !== 'string') {
        throw new HttpException('Parameter "location" must be a string', HttpStatus.BAD_REQUEST);
      }

      if (!allMandatoriesAttributes(location)) {
        throw new HttpException('Missing attribute "longitude", "latitude" or "radius" in parameter "Location"', HttpStatus.BAD_REQUEST);
      }
      
      result = await this.concertsService.searchByLocation(location);
    } 

    if (!result.length) {
      throw new HttpException('No concerts found', HttpStatus.NO_CONTENT);
    }

    const orderedResult: Concerts[] = orderBy(result, [concert => new Date(concert.date)], ['desc']);

    const classResult = plainToClass(Concerts, orderedResult);
    const serializedResult: Result[] = classResult.map((concert) => serializedItem(concert, concert.band, concert.venue));
    
    return serializedResult;
  }
}
