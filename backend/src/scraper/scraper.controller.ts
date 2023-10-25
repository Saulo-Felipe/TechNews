import { Controller, Get } from "@nestjs/common";
import { ScraperService } from "./scraper.service";
import { Cron, CronExpression } from "@nestjs/schedule";

@Controller("scraper")
export class ScraperContoller {
  constructor(private readonly scraperService: ScraperService) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  @Get("update-categories")
  async updateCategories() {
    const points = { initial: "esportes", final: "lifestyle" };

    const response = await this.scraperService.updateCNNCategories(points);

    return response;
  }
}
