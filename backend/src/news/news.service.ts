import { Injectable } from "@nestjs/common";
import { CreateNewsDto } from "./dto/createNews.dto";
import { PrismaService } from "src/database/prisma.service";
import { News } from "@prisma/client";
import { NewsPreview } from "src/types/GeneralTypes";

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  public async createOne(news: CreateNewsDto): Promise<News> {
    const createdNews = await this.prisma.news.create({ data: news });

    return createdNews;
  }

  public async getMany(limit: number = 10): Promise<News[]> {
    const response = await this.prisma.news.findMany({
      take: limit,
    });

    return response;
  }

  public async getManyRandomPreview(
    limit: number = 10,
  ): Promise<NewsPreview[]> {
    const totalNewsCount = await this.prisma.news.count();

    const randomValue = Math.floor(Math.random() * (totalNewsCount - limit));

    const randomNews = await this.prisma.news.findMany({
      select: {
        title: true,
        id: true,
        excerpt: true,
        cover_image_url: true,
      },
      take: limit,
      skip: randomValue < 0 ? 0 : randomValue, // does not accept negative values
    });

    return randomNews;
  }

  public async getMostAccessedPreview(): Promise<NewsPreview[]> {
    return await this.prisma.news.findMany({
      take: 10,
      orderBy: { views: "asc" },
      select: {
        title: true,
        id: true,
        excerpt: true,
        cover_image_url: true,
      },
    });
  }

  public async getOne(id: number): Promise<News> {
    const news = await this.prisma.news.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
        tags: true,
      },
    });

    return news;
  }
}
