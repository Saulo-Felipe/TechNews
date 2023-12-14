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
import {
  GetPreviewQueryDto,
  NewsIdParam,
  QueryPreviewTypeDto,
} from "./dto/getNews.dto";

@Controller("news")
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  public async createOne(@Body() data: CreateNewsDto) {
    return await this.newsService.createOne(data);
  }

  @Get("get-one/:newsId")
  public async getOne(@Param() { newsId }: NewsIdParam) {
    const news = await this.newsService.getOne(newsId);

    if (news === null) {
      throw new HttpException(
        "Página não encontrada",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return news;
  }

  @Post("add-view/:newsId")
  public async addView(@Param() { newsId }: NewsIdParam) {
    const response = await this.newsService.addView(newsId);

    if (response.error) {
      throw new HttpException(
        "Id não encontrado",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return response;
  }

  @Get("search/:searchQuery")
  public async search(@Param() { searchQuery }: { searchQuery: string }) {
    return await this.newsService.search(searchQuery);
  }

  @Get("preview/:type")
  public async getRandom(
    @Query() { limit, tags }: GetPreviewQueryDto,
    @Param() { type }: QueryPreviewTypeDto,
  ) {
    const keyValue = {
      random: () => this.newsService.getManyRandomPreview(limit),
      "most-accessed": () => this.newsService.getMostAccessedPreview(),
      latest: () => this.newsService.getManyLatestPreview(limit),
      "related-tags": () => this.newsService.getNewsBasedOnTags(tags, limit),
    };

    return await keyValue[type]();
  }
}
