import { PrismaService } from "src/database/prisma.service";
import { Injectable } from "@nestjs/common";
import { Category } from "@prisma/client";

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  public async get(amount: number): Promise<Category[]> {
    const dbCategories = await this.prisma.category.findMany({
      take: amount,
    });

    return dbCategories;
  }
}
