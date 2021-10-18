import { IsInt, IsString } from 'class-validator';

export class GetConcertsDto{
  @IsString()
  bandIds: string;

  @IsString()
  latitude: number;

  @IsString()
  longitude: number;

  @IsInt()
  radius: number;
}