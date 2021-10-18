import { Exclude, Expose } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Concerts } from '../concerts/concerts.entity';

@Entity()
export class Bands extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column()
  @Expose()
  name: string;

  @OneToMany(() => Concerts, concert => concert.band)
  concerts: Concerts[];
}
