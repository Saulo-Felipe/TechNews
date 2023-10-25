import { Injectable } from "@nestjs/common";
import puppeteer from "puppeteer";
import { PrismaService } from "src/database/prisma.service";
import { DefaultResponse } from "src/types/GenericTypes";

@Injectable()
export class ScraperService {
  constructor(private prisma: PrismaService) {}

  public async updateCNNCategories(points: {
    initial: string;
    final: string;
  }): Promise<DefaultResponse<{ name: string }[]>> {
    const scrapedCategories = await this._scrapeCategories({ ...points });

    if (scrapedCategories.error) {
      return { error: scrapedCategories.error };
    }

    const dbCategories: string[] = (
      await this.prisma.category.findMany({ select: { name: true } })
    ).map((item) => item.name.toLowerCase());

    // filter and format categories that are not in the database
    const formatedData: { name: string }[] = scrapedCategories.data
      .filter((category) => !dbCategories.includes(category.toLowerCase()))
      .map((category) => ({ name: category }));

    if (formatedData.length > 0) {
      await this.prisma.category.createMany({ data: formatedData });
    }

    return {
      success: "Categorias atualizadas com sucesso",
      data: formatedData,
    };
  }

  private async _scrapeCategories(points: {
    initial: string;
    final: string;
  }): Promise<DefaultResponse<string[]>> {
    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();

      await page.goto("https://www.cnnbrasil.com.br/");

      const allCategories = await page.evaluate((points) => {
        const categories = [
          ...document.querySelectorAll(".menu__editorials li"),
        ].map((e) => e.textContent.trim());

        const initialPointIndex = categories.findIndex(
          (item) => item.toLowerCase() === points.initial,
        );

        const finalPointIndex = categories.findIndex(
          (item) => item.toLowerCase() === points.final,
        );

        categories.splice(0, initialPointIndex);
        categories.splice(finalPointIndex, categories.length - finalPointIndex);

        return categories;
      }, points);

      await browser.close();

      return { data: allCategories };
    } catch (error) {
      console.log(error);
      return { error: "Ocorreu um erro ao realizar o scrape" };
    }
  }
}
