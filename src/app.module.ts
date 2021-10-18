import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenuesModule } from './venues/venues.module';
import { BandsModule } from './bands/bands.module';
import { ConcertsModule } from './concerts/concerts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'concert_nest_api',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConcertsModule,
    VenuesModule,
    BandsModule,
  ],
})
export class AppModule {}
