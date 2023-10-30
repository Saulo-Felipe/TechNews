import { Injectable } from "@nestjs/common";
import { CreateNewsDto } from "./dto/createNews.dto";
import { PrismaService } from "src/database/prisma.service";
import { News } from "@prisma/client";

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  public async create(news: CreateNewsDto): Promise<News> {
    const response = await this.prisma.news.create({ data: news });

    return response;
  }

  public async get(limit?: number): Promise<News[]> {
    const response = await this.prisma.news.findMany({
      take: limit ? limit : 10,
    });

    return response;
  }

  public async getRandom(limit?: number) {
    const totalNewsCount = await this.prisma.news.count();
    const randomValue = Math.floor(
      Math.random() * (totalNewsCount - limit - 1),
    );
    const randomNews = await this.prisma.news.findMany({
      take: limit,
      skip: randomValue,
    });

    return randomNews;
  }

  public async getMostAccessed(): Promise<News[]> {
    return await this.prisma.news.findMany({
      take: 10,
      orderBy: { views: "asc" },
    });
  }

  public async gets(offset: number): Promise<News[]> {
    const response = await this.prisma.news.findMany({
      skip: offset * 4,
      take: 4,
    });

    return response;
  }
}
