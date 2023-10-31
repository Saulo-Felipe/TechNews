import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { NewsService } from "./news.service";
import { CreateNewsDto } from "./dto/createNews.dto";
import { GetLimitQueryDto, GetOneNewsDto } from "./dto/getNews.dto";
import { NewsPreview } from "src/types/GeneralTypes";

@Controller("news")
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  public async createOne(@Body() data: CreateNewsDto) {
    return await this.newsService.createOne(data);
  }

  @Get()
  public async getMany(@Query() { limit }: GetLimitQueryDto) {
    return await this.newsService.getMany(limit);
  }

  @Get("get-one/:id")
  public async getOne(@Param() { id }: GetOneNewsDto) {
    const news = await this.newsService.getOne(id);

    if (news === null) {
      throw new HttpException(
        "Página não encontrada",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return news;
  }

  // =-=-=-=-=| Previews |=-=-=-=-=-=-

  @Get("preview/:type")
  public async getRandom(
    @Query() { limit }: GetLimitQueryDto,
    @Param() {}: QueryPreviewTypeDto,
  ) {
    const response = await this.newsService.getManyRandomPreview(limit);

    return response;
  }

  @Get("preview/most-accessed")
  public async mostAccessed(): Promise<NewsPreview[]> {
    const response = await this.newsService.getMostAccessedPreview();

    return response;
  }
}
