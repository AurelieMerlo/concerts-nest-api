import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Concert } from '../concert/concert.entity';

@Entity()
export class Venue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'float',
  })
  latitude: string;

  @Column({
    type: 'float',
  })
  longitude: string;

  @OneToMany(() => Concert, concert => concert.venue)
  concerts: Concert[];
}