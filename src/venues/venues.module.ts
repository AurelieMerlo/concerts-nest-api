import { Module } from '@nestjs/common';
import { VenuesService } from './venues.service';
import { VenuesController } from './venues.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venues } from './venues.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venues])],
  providers: [VenuesService],
  controllers: [VenuesController]
})
export class VenuesModule {}
