import { PrismaService } from "src/database/prisma.service";
import { Injectable } from "@nestjs/common";
import { Category } from "@prisma/client";

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  public async get(limit: number): Promise<Category[]> {
    const dbCategories = await this.prisma.category.findMany({
      take: limit,
    });

    return dbCategories;
  }

  public async getUpdateHistory() {
    const response = await this.prisma.updateHistory.findMany({
      take: 10,
      orderBy: {
        id: "desc",
      },
    });

    return response;
  }
}
