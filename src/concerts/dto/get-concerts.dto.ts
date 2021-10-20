import { IsInt, IsString } from 'class-validator';

export class GetConcertsDto{
  @IsString()
  bandIds: string;

  @IsString()
  latitude: string;

  @IsString()
  longitude: string;

  @IsInt()
  radius: string;
}