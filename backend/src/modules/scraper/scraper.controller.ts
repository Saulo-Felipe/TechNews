import { Controller, Get } from "@nestjs/common";
import { ScraperService } from "./scraper.service";
import { Cron, CronExpression } from "@nestjs/schedule";
import { SocketGateway } from "./socket.gateway";

@Controller("scraper")
export class ScraperContoller {
  constructor(
    private readonly scraperService: ScraperService,
    private readonly socketGateway: SocketGateway,
  ) {}
  private isUpdating: boolean = false;

  @Cron(CronExpression.EVERY_WEEK)
  @Get("update-categories")
  public async updateCategories() {
    const points = { initial: "esportes", final: "lifestyle" };

    if (this.isUpdating) return {};

    this.socketGateway.io.emit("new-message", {
      status: "info",
      message: "Buscando nova categorias...",
    });
    this.isUpdating = true;

    const response = await this.scraperService.updateCNNCategories(points);

    this.socketGateway.io.emit("new-message", {
      status: response.error ? "error" : "success",
      message: response.error || response.success,
    });
    this.isUpdating = false;

    return "";
  }

  @Get("update-news")
  public async updateNews() {
    const response = await this.scraperService.updateCNNNews();

    return response;
  }
}
