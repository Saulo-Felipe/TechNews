import { IsEnum, IsInt, IsOptional, MinLength } from "class-validator";

export class GetPreviewQueryDto {
  @IsOptional()
  @IsInt()
  limit: number;

  // @IsOptional()
  // @IsArray()
  // @IsString({ each: true })
  // @Transform(({ value }) => {
  //   return JSON.parse(value);
  // })
}

export class QueryPreviewTypeDto {
  @IsEnum(["random", "latest", "most-accessed", "related-tags"])
  type: "random" | "latest" | "most-accessed" | "related-tags";
}

export class QueryNewsByCatgoryDto {
  @MinLength(2)
  category: string;
}

export class NewsIdParam {
  @IsInt()
  newsId: number;
}
