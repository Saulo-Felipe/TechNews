import { Body, Controller, Post } from "@nestjs/common";
import { NewsService } from "./news.service";
import { CreateNewsDto } from "./dto/createNews.dto";

@Controller("news")
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  public async create(@Body() data: CreateNewsDto) {
    return await this.newsService.create(data);
  }
}
