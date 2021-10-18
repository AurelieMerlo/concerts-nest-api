import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
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

  @Column({
    type: 'float',
  })
  @Expose()
  latitude: number;

  @Column({
    type: 'float',
  })
  @Expose()
  longitude: number;

  @OneToMany(() => Concerts, concert => concert.venue)
  concerts: Concerts[];
}