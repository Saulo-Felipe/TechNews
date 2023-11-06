import { Transform } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsOptional, IsString } from "class-validator";

export class GetPreviewQueryDto {
  @IsOptional()
  @IsInt()
  limit: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => {
    return JSON.parse(value);
  })
  tags: string[];
}

export class QueryPreviewTypeDto {
  @IsEnum(["random", "latest", "most-accessed", "related-tags"])
  type: "random" | "latest" | "most-accessed" | "related-tags";
}

export class NewsIdParam {
  @IsInt()
  newsId: number;
}
