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

  @MinLength(10)
  @IsString()
  url: string;

  @MinLength(25)
  @IsString()
  excerpt: string;

  @ArrayMinSize(1)
  images_url: string[];

  @MinLength(25)
  @IsString()
  cover_image_url: string;

  @IsEnum(["CNN", "TechNews"])
  originalContent: string;

  @IsEnum(["HTML", "JSON"])
  content_type: string;

  @IsInt()
  userId: number;

  @IsInt()
  categoryId: number;

  @IsInt()
  views: number;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date;

  @IsOptional()
  id: number;
}
