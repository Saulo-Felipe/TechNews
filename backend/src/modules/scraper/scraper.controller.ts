import { Controller, Get } from "@nestjs/common";
import { ScraperService } from "./scraper.service";
import { Cron, CronExpression } from "@nestjs/schedule";

@Controller("scraper")
export class ScraperContoller {
  constructor(private readonly scraperService: ScraperService) {}

  @Cron(CronExpression.EVERY_WEEK)
  @Get("update-categories")
  public async updateCategories() {
    const points = { initial: "esportes", final: "lifestyle" };

    const response = await this.scraperService.updateCNNCategories(points);

    return response;
  }

  @Get("update-news")
  public async updateNews() {
    const response = await this.scraperService.updateCNNNews();

    return response;
  }
}
