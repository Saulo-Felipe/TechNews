import { Injectable } from "@nestjs/common";
import { CreateNewsDto } from "./dto/createNews.dto";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  public async create(news: CreateNewsDto): Promise<CreateNewsDto> {
    const response = await this.prisma.news.create({ data: news });
    return response;
  }
}
