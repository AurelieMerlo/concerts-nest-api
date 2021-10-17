import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Band } from '../band/band.entity';
import { Venue } from '../venue/venue.entity';

@Entity()
export class Concert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp',
  })
  date: string;

  @ManyToOne(() => Band, band => band.concerts)
  band: Band;

  @ManyToOne(() => Venue, venue => venue.concerts)
  venue: Venue;
}