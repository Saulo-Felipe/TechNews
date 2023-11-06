import { IsString } from "class-validator";

export class GetUserDataDto {
  @IsString()
  token: string;
}
