import { Controller, Get, Query, ClassSerializerInterceptor, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { orderBy } from 'lodash';
import { isObjectEmpty, serializedItem } from 'src/utils';
import { ConcertsService } from './concerts.service';
import { GetConcertsDto } from './dto/get-concerts.dto';
import { plainToClass } from 'class-transformer';
import { Concerts } from './concerts.entity';

@Controller('concerts')
@UseInterceptors(ClassSerializerInterceptor)
export class ConcertsController {
  constructor(private readonly concertsService: ConcertsService) {}
  
  @Get()
  async getConcerts(@Query() queryParams?: GetConcertsDto) {
    let result: Concerts[];
    
    try {
      if (isObjectEmpty(queryParams)) {
        result = await this.concertsService.findAll();
      };
  
      if (queryParams.bandIds) {
        result = await this.concertsService.findByBands(queryParams);
      }
  
      if (queryParams.longitude && queryParams.latitude && queryParams.radius) {
        result = await this.concertsService.findByLocation(queryParams);
      }
    } catch (e) {
      throw new HttpException('No result found', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const orderedResult: Concerts[] = orderBy(result, [concert => new Date(concert.date)], ['desc']);

    const serializedResult = plainToClass(Concerts, orderedResult);
    return serializedResult.map((concert) => serializedItem(concert, concert.band, concert.venue));
  }
}
