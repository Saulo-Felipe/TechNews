import { Module } from "@nestjs/common";
import { ScraperService } from "./scraper.service";
import { ScraperContoller } from "./scraper.controller";
import { PrismaService } from "src/database/prisma.service";

@Module({
  imports: [],
  controllers: [ScraperContoller],
  providers: [ScraperService, PrismaService],
})
export class ScraperModule {}
