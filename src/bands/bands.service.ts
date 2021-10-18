import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bands } from './bands.entity';

@Injectable()
export class BandsService {
  constructor(
    @InjectRepository(Bands)
    private readonly bandsRepository: Repository<Bands>,
  ) {}

  findAll(): Promise<Bands[]> {
    return this.bandsRepository.find();
  }
}


