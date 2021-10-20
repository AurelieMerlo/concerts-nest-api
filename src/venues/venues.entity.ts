import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm';
import { Exclude, Expose } from "class-transformer";
import { Concerts } from '../concerts/concerts.entity';

@Entity()
export class Venues {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column()
  @Expose()
  name: string;

  @Column({ type: 'double precision' })
  latitude: number;

  @Column({ type: 'double precision' })
  longitude: number; 

  @OneToMany(() => Concerts, concert => concert.venue)
  concerts: Concerts[];
}