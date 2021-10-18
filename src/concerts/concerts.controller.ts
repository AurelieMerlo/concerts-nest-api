import { Controller, Get, Query, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
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
  getConcerts(@Query() queryParams?: GetConcertsDto) {
    if (isObjectEmpty(queryParams)) {
      return this.concertsService.findAll();
    };

    const result = this.concertsService.findBy(queryParams).then((concerts: Concerts[]) => {
      const serializedConcerts = plainToClass(Concerts, concerts);
      return serializedConcerts.map((concert) => serializedItem(concert));
    });

    return result;
  }
}
