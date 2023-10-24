import { Module } from "@nestjs/common";
import { ScraperService } from "./scraper.service";
import { ScraperContoller } from "./scraper.controller";

@Module({
  imports: [],
  controllers: [ScraperContoller],
  providers: [ScraperService],
})
export class ScraperModule {}
