import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Bands } from '../bands/bands.entity';
import { Venues } from '../venues/venues.entity';

@Entity()
export class Concerts {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  bandId: number;

  @Column()
  venueId: number;

  @Column()
  date: number;

  @ManyToOne(() => Bands, band => band.concerts)
  band: Bands;

  @ManyToOne(() => Venues, venue => venue.concerts)
  venue: Venues;
}