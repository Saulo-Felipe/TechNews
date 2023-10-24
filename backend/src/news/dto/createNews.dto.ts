import { ArrayMinSize, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { News } from "@prisma/client";

export class CreateNewsDto implements News {
  @IsOptional()
  id: number;

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
  
  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date;
}
