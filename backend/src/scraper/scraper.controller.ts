import { Controller, Get } from "@nestjs/common";
import { ScraperService } from "./scraper.service";
import { Cron, CronExpression } from "@nestjs/schedule";

@Controller("scraper")
export class ScraperContoller {
  constructor(private readonly scraperService: ScraperService) {}

  //@Cron("0 12 * * *") // Run every day at 12:00
  // @Cron("*/120 * * * * *") // Run every 2 minutes
  // @Cron(CronExpression.EVERY_10_MINUTES)
  // @Get()
  // async getNewNews(): Promise<string> {
  //   const result = await this.scraperService.scrapeCNNBrasil();
  //   return result;
  // }

  @Cron(CronExpression.EVERY_10_MINUTES)
  @Get("updatecategories")
  async updateCategories() {
    const breakPoints = {
      initial: "esportes",
      final: "lifestyle",
    };

    const response = await this.scraperService.updateCNNCategories(
      breakPoints.initial,
      breakPoints.final,
    );

    return response;
  }
}
