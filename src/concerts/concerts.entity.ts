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
  @Expose()
  date: number;

  @ManyToOne(type => Bands, band => band.concerts)
  @JoinColumn({ name: "bandId" })
  band: Bands;

  @ManyToOne(type => Venues, venue => venue.concerts)
  @JoinColumn({ name: "venueId" })
  venue: Venues;
 
  @Column({ nullable: false })
  venueId: number;

  @Column({ nullable: false })
  bandId: number;
}
