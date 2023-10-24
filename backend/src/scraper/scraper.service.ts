import { Injectable } from "@nestjs/common";
import puppeteer from "puppeteer";
import { PrismaService } from "src/database/prisma.service";
import { DefaultResponse } from "src/types/GenericTypes";

@Injectable()
export class ScraperService {
  constructor(private prisma: PrismaService) {}

  public async scrapeCNNBrasil(): Promise<string> {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://www.cnnbrasil.com.br/");

    await browser.close();

    return "success";
  }

  public async updateCNNCategories(
    initialBreakpoint: string,
    finalBreakpoint: string,
  ): Promise<DefaultResponse<string[]>> {
    const response = await this.scrapeCategory(
      initialBreakpoint,
      finalBreakpoint,
    );

    if (response.error) return { error: response.error };

    const dbResponse = await this.prisma;

    return {
      success: "Categorias atualizadas com sucesso",
      data: response.data,
    };
  }

  private async scrapeCategory(
    initialBreakpoint: string,
    finalBreakpoint: string,
  ): Promise<DefaultResponse<string[]>> {
    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();

      await page.goto("https://www.cnnbrasil.com.br/");

      const allCategories = await page.evaluate(
        (initialBreakpoint, finalBreakpoint) => {
          const categories = [
            ...document.querySelectorAll(".menu__editorials li"),
          ].map((e) => e.textContent.trim());

          const initialBreakpointIndex = categories.findIndex(
            (item) => item.toLowerCase() === initialBreakpoint,
          );

          const finalBreakpointIndex = categories.findIndex(
            (item) => item.toLowerCase() === finalBreakpoint,
          );

          categories.splice(0, initialBreakpointIndex);
          categories.splice(
            finalBreakpointIndex,
            categories.length - finalBreakpointIndex,
          );

          return categories;
        },
        initialBreakpoint,
        finalBreakpoint,
      );

      return { data: allCategories };
    } catch (error) {
      console.log(error);
      return { error: "Ocorreu um erro ao realizar o scrape" };
    }
  }
}
