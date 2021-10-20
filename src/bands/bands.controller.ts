import { Controller, Get } from '@nestjs/common';
import { BandsService } from './bands.service';

@Controller('bands')
export class BandsController {
  constructor(private readonly bandsService: BandsService) {}

  @Get()
  getBands() {
    return this.bandsService.findAll();
  }
}