import { IsEnum, IsInt, IsOptional } from "class-validator";

export class GetLimitQueryDto {
  @IsOptional()
  @IsInt()
  limit: number;
}

export class QueryPreviewTypeDto {
  @IsEnum(["random", "latest", "most-accessed"])
  type: "random" | "latest" | "most-accessed";
}

export class NewsIdParam {
  @IsInt()
  newsId: number;
}
