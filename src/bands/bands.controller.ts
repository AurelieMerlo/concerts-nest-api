import { Controller, Get } from '@nestjs/common';
import { BandsService } from './bands.service';
import { Bands } from './bands.entity';

@Controller('bands')
export class BandsController {
  constructor(private readonly bandsService: BandsService) {}

  @Get()
  getBands() {
    return this.bandsService.findAll();
  }
}