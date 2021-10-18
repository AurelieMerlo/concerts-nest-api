import { Exclude, Expose } from "class-transformer";

@Exclude()
export class VenueDto {
  @Exclude() id: number;
  @Expose() name: string;
  @Expose() latitude: number;
  @Expose() longitude: number;
}