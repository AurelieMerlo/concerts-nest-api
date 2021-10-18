import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Concerts } from '../concerts/concerts.entity';

@Entity()
export class Venues {
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

  @OneToMany(() => Concerts, concert => concert.venue)
  concerts: Concerts[];
}