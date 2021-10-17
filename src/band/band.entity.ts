import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Concert } from '../concert/concert.entity';

@Entity()
export class Band {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Concert, concert => concert.band)
  concerts: Concert[];
}