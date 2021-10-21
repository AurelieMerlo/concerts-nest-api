import { IsNotEmpty, IsString } from "class-validator";

export class ConcertDto {
    id: number;
    venueId: number;  
    bandId: number;
    date: number;
}

export class SearchBandParamDto {
    @IsString()
    @IsNotEmpty()
    bandIds: string;
}

export class SearchLocationParamDto {
    @IsString()
    @IsNotEmpty()
    location: string;
}
  
