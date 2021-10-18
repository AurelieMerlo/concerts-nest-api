import { Exclude, Expose } from "class-transformer";

@Exclude()
export class BandDto {
  @Exclude() id: number;
  @Expose() name: string;
}