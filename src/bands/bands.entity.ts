import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Concerts } from '../concerts/concerts.entity';

@Entity()
export class Bands extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Concerts, concert => concert.band)
  concerts: Concerts[];
}
