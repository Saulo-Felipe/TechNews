import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { NewsService } from "./news.service";
import { CreateNewsDto } from "./dto/createNews.dto";
import { GetNewsDto } from "./dto/getNews.dto";
import { News } from "@prisma/client";

@Controller("news")
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  public async create(@Body() data: CreateNewsDto) {
    return await this.newsService.create(data);
  }

  @Get()
  public async get(@Query() params: GetNewsDto) {
    return await this.newsService.get(params.limit);
  }

  @Get("random")
  public async getRandom(@Query() params: GetNewsDto) {
    return await this.newsService.getRandom(params.limit);
  }

  @Get("most-accessed")
  public async mostAccessed(): Promise<News[]> {
    return await this.newsService.getMostAccessed();
  }
}
