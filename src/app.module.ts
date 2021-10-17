import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenueModule } from './venue/venue.module';
import { BandModule } from './band/band.module';
import { ConcertModule } from './concert/concert.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'concert_nest_api',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ConcertModule,
    VenueModule,
    BandModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
