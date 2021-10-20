import { IsNumberString, IsNotEmpty, IsString } from 'class-validator';

export class ConcertsDto {
  @IsNumberString()
  @IsNotEmpty({
    groups: ['location'],
  })
  latitude: string;

  @IsNumberString()
  @IsNotEmpty({
    groups: ['location'],
  })
  longitude: string;

  @IsNumberString()
  @IsNotEmpty({
    groups: ['location'],
  })
  radius: string;

  @IsString()
  @IsNotEmpty({
    groups: ['bands'],
  })
  bandIds: string;
}