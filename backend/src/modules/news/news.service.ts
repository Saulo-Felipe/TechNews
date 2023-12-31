import { Injectable } from "@nestjs/common";
import { CreateNewsDto } from "./dto/createNews.dto";
import { PrismaService } from "../../database/prisma.service";
import { News } from "@prisma/client";
import { DefaultResponse, NewsPreview } from "../../types/GeneralTypes";

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  public async createOne(news: CreateNewsDto): Promise<News> {
    const createdNews = await this.prisma.news.create({ data: news });

    return createdNews;
  }

  public async addView(newsId: number): Promise<DefaultResponse<void>> {
    try {
      await this.prisma.news.update({
        where: {
          id: newsId,
        },
        data: {
          views: {
            increment: 1,
          },
        },
      });

      return { success: "View adicionada com sucesso" };
    } catch (e) {
      console.log(e);
      return { error: "Notícia não encontrada" };
    }
  }

  public async getManyLatestPreview(
    limit: number = 10,
  ): Promise<NewsPreview[]> {
    const response = await this.prisma.news.findMany({
      take: limit,
      orderBy: {
        id: "desc",
      },
      select: {
        title: true,
        id: true,
        excerpt: true,
        cover_image_url: true,
      },
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
      orderBy: { views: "desc" },
      select: {
        views: true,
        title: true,
        id: true,
        excerpt: true,
        cover_image_url: true,
      },
    });
  }

  public async getOne(newsId: number): Promise<News> {
    const news = await this.prisma.news.findUnique({
      where: {
        id: newsId,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
        category: true,
        tags: true,
      },
    });

    return news;
  }

  public async search(searchQuery: string) {
    return await this.prisma.news.findMany({
      where: {
        title: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
      select: {
        views: true,
        title: true,
        id: true,
        excerpt: true,
        cover_image_url: true,
        createdAt: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  public async getByCategory(category: string, limit = 25) {
    const response = await this.prisma.news.findMany({
      where: {
        category: {
          name: {
            contains: category,
            mode: "insensitive",
          },
        },
      },
      select: {
        category: true,
        title: true,
        id: true,
        excerpt: true,
        cover_image_url: true,
      },
      take: limit,
    });

    return response;
  }
}
