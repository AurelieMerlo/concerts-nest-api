import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Concerts } from './concerts.entity';

@Injectable()
export class ConcertsService {
  constructor(
    @InjectRepository(Concerts)
    private readonly concertsRepository: Repository<Concerts>,
  ) {}

  findAll(): Promise<Concerts[]> {
    return this.concertsRepository.find();
  }
}