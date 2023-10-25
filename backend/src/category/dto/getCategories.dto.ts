import { IsInt, IsPositive } from "class-validator";

export class GetCategoriesDto {
  @IsPositive()
  @IsInt()
  amount: number;
}
