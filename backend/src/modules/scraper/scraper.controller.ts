import { Controller, Get, Post } from "@nestjs/common";
import { ScraperService } from "./scraper.service";
import { Cron, CronExpression } from "@nestjs/schedule";
import { SocketGateway } from "./socket.gateway";

@Controller("scraper")
export class ScraperContoller {
  constructor(
    private readonly scraperService: ScraperService,
    private readonly socketGateway: SocketGateway,
  ) {}
  private readonly isUpdating = {
    categories: false,
    news: false,
  };

  @Get("status")
  public getStatus() {
    return this.isUpdating;
  }

  @Cron(CronExpression.EVERY_WEEK)
  @Post("update-categories")
  public async updateCategories() {
    try {
      if (this.isUpdating.categories) return;

      this.isUpdating.categories = true;
      this.socketGateway.io.emit("change-loading-state", this.isUpdating);

      const points = { initial: "esportes", final: "lifestyle" };

      this.socketGateway.io.emit("new-message", {
        status: "info",
        message: "Buscando novas categorias...",
      });

      const response = await this.scraperService.updateCNNCategories(points);

      this.socketGateway.io.emit("new-message", {
        status: response.success ? "success" : "error",
        message:
          response.error ||
          `Categorias atualizadas: + ${response.data.length} categorias adicionadas`,
      });
    } catch (e) {
      this.socketGateway.io.emit("new-message", {
        status: "error",
        message: "Ocorreu um erro interno no servidor",
      });
    }

    this.isUpdating.categories = false;
    this.socketGateway.io.emit("change-loading-state", this.isUpdating);
    return;
  }

  @Post("update-news")
  public async updateNews() {
    try {
      if (this.isUpdating.news) return;

      this.isUpdating.news = true;
      this.socketGateway.io.emit("change-loading-state", this.isUpdating);

      this.socketGateway.io.emit("new-message", {
        status: "info",
        message: "Iniciando a busca de novas notícias...",
      });

      const response = await this.scraperService.updateCNNNews();

      this.socketGateway.io.emit("new-message", {
        status: "success",
        message: `Atualização realizada com sucesso: + ${response.length} novas notícias`,
      });
    } catch (e) {
      this.socketGateway.io.emit("new-message", {
        status: "error",
        message: "Ocorreu um erro interno no servidor",
      });
    }

    this.isUpdating.news = false;
    this.socketGateway.io.emit("change-loading-state", this.isUpdating);
    return;
  }
}
