import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { PrismaService } from "src/database/prisma.service";

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService],
})
export class CategoryModule {}
