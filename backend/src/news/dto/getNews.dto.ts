import { IsInt, IsOptional } from "class-validator";

export class GetNewsDto {
  @IsOptional()
  @IsInt()
  limit: number;
}
