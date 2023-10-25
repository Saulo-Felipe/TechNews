import {
  ArrayMinSize,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  IsInt,
} from "class-validator";
import { News } from "@prisma/client";

export class CreateNewsDto implements News {
  @MinLength(100)
  @IsString()
  content: string;

  @MinLength(5)
  @IsString()
  title: string;

  @ArrayMinSize(1)
  images_url: string[];

  @IsEnum(["HTML", "JSON"])
  content_type: string;

  @IsInt()
  userId: number;

  @IsInt()
  categoryId: number;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date;

  @IsOptional()
  id: number;
}
