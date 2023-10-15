import { Body, Controller, Get, Post, ValidationPipe } from "@nestjs/common";
import { NewsService } from "./news.service";
import { CreateNewsDto } from "./dto/createNews.dto";

@Controller("news")
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  getOne(): string {
    return "hello";
  }

  @Post()
  public async create(@Body(new ValidationPipe()) data: CreateNewsDto) {
    return this.newsService.create(data);
  }
}
