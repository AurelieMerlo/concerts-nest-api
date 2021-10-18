import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Exclude, Expose } from "class-transformer";
import { Bands } from '../bands/bands.entity';
import { Venues } from '../venues/venues.entity';

@Entity()
export class Concerts {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;
  
  @Column()
  @Exclude()
  bandId: number;

  @Column()
  @Exclude()
  venueId: number;

  @Column()
  @Expose()
  date: number;

  @ManyToOne(type => Bands, band => band.concerts, { eager: false })
  @JoinColumn()
  band: Bands

  @ManyToOne(type => Venues, venue => venue.concerts, { eager: false })
  @JoinColumn()
  venue: Venues
}