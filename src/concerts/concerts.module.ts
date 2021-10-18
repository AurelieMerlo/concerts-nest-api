import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConcertsService } from './concerts.service';
import { ConcertsController } from './concerts.controller';
import { Concerts } from './concerts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Concerts])],
  providers: [ConcertsService],
  controllers: [ConcertsController]
})
export class ConcertsModule {}
