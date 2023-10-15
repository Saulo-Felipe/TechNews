import { IsString, MinLength } from "class-validator";
import { News } from "@prisma/client";

export class CreateNewsDto implements Omit<News, "id"> {
  @MinLength(100)
  @IsString()
  content: string;

  @MinLength(5)
  @IsString()
  title: string;
}
