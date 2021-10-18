import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venues } from './venues.entity';

@Injectable()
export class VenuesService {
  constructor(
    @InjectRepository(Venues)
    private readonly venuesRepository: Repository<Venues>,
  ) {}

  findAll(): Promise<Venues[]> {
    return this.venuesRepository.find();
  }
}