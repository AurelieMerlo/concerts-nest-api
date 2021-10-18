import { Module } from '@nestjs/common';
import { BandsService } from './bands.service';
import { BandsController } from './bands.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bands } from './bands.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bands])],
  providers: [BandsService],
  controllers: [BandsController]
})
export class BandsModule {}
