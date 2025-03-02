import { Injectable } from "@nestjs/common";
import puppeteer, { Page } from "puppeteer-core";
import { PrismaService } from "../../database/prisma.service";
import {
  DefaultResponse,
  ScrapeLatestNewsURL,
  ScrapeOneNews,
} from "../../types/GeneralTypes";
import { SocketGateway } from "./socket.gateway";

@Injectable()
export class ScraperService {
  private page: Page;

  constructor(
    private readonly prisma: PrismaService,
    private readonly socketGateway: SocketGateway,
  ) { }

  public async updateCNNCategories(points: {
    initial: string;
    final: string;
  }): Promise<DefaultResponse<{ name: string }[]>> {
    const scrapedCategories = await this._scrapeCategories({ ...points });

    if (scrapedCategories.error) return { error: scrapedCategories.error };

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

    await this.prisma.updateHistory.create({
      data: {
        type: "category",
        updated_amount: formatedData.length,
      },
    });

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
      const browser = await puppeteer.launch({
        headless: true,
        executablePath: "/usr/bin/google-chrome",
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
      });
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(60000);

      await page.goto("https://www.cnnbrasil.com.br/");

      const allCategories = await page.evaluate((points) => {
        const categories = [
          ...document.querySelectorAll<HTMLLIElement>(".menu__editorials li"),
        ].map((e) => e.textContent.toLowerCase().trim());

        const initialPointIndex = categories.findIndex(
          (item) => item === points.initial,
        );

        const finalPointIndex = categories.findIndex(
          (item) => item === points.final,
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

  public async updateCNNNews(): Promise<number> {
    // scrapper configs
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: "/usr/bin/google-chrome",
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
    });
    this.page = await browser.newPage();
    this.page.setDefaultNavigationTimeout(60000);

    let latestNewsResponseURLs = (await this._scrapeLatestNewsURL()).reverse();

    const dbInitPoint = await this.prisma.news.findFirst({
      orderBy: {
        id: "desc",
      },
      select: {
        url: true,
      },
    });

    const initialIndex = latestNewsResponseURLs.findIndex(
      (item) => item.url === dbInitPoint?.url,
    );

    latestNewsResponseURLs = latestNewsResponseURLs.slice(
      initialIndex + 1,
      latestNewsResponseURLs.length,
    );

    let updatedNewsCount: number = 0;

    for (const newsUrl of latestNewsResponseURLs) {
      this.socketGateway.io.emit("new-message", {
        status: "info",
        message: `Importando nova notícia...`,
      });

      this.page = await browser.newPage();
      this.page.setDefaultNavigationTimeout(60000);

      const oneNews = await this._scrapeOneNews(newsUrl.url);

      if (oneNews.error) {
        console.log("\nErro na noticia: ", newsUrl);
        this.socketGateway.io.emit("new-message", {
          status: "error",
          message: `<strong>Erro: </strong> não foi possível importar a notícia, ${newsUrl.url}`,
        });
      } else {
        await this.prisma.news.create({
          data: {
            views: 0,
            images_url: [],
            title: oneNews.data.title,
            content: oneNews.data.content,
            excerpt: oneNews.data.excerpt,
            publicationDate: oneNews.data.publicationDate,
            content_type: "HTML",
            originalContent: "CNN",
            url: newsUrl.url,
            cover_image_url: newsUrl.coverImageUrl,
            user: {
              connectOrCreate: {
                where: {
                  username: oneNews.data.author,
                },
                create: {
                  username: oneNews.data.author,
                  email:
                    oneNews.data.author.replaceAll(" ", "") + "@technews.com",
                },
              },
            },
            category: {
              connectOrCreate: {
                where: {
                  name: oneNews.data.category,
                },
                create: {
                  name: oneNews.data.category,
                },
              },
            },
            tags: {
              connectOrCreate: oneNews.data.tags.map((tagName) => ({
                where: {
                  name: tagName,
                },
                create: {
                  name: tagName,
                },
              })),
            },
          },
        });

        this.socketGateway.io.emit("new-message", {
          status: "success",
          message: `<strong>Nova notícia salva:</strong> ${oneNews.data.title}`,
        });

        updatedNewsCount++;
      }
      await this.page.close();
    }

    await browser.close();

    await this.prisma.updateHistory.create({
      data: {
        type: "news",
        updated_amount: updatedNewsCount,
      },
    });

    return updatedNewsCount;
  }

  private async _scrapeLatestNewsURL(): Promise<ScrapeLatestNewsURL[]> {
    await this.page.goto("https://www.cnnbrasil.com.br/ultimas-noticias");

    const evaluateAllUrlResponse: ScrapeLatestNewsURL[] =
      await this.page.evaluate(() => {
        const allNewsCards = [
          ...document.querySelectorAll<HTMLLinkElement>(
            ".home__list__item > a",
          ),
        ].map((linkElement) => ({
          url: linkElement.href,
          coverImageUrl: linkElement.querySelector("img").src,
        }));

        return allNewsCards;
      });

    return evaluateAllUrlResponse;
  }

  private async _scrapeOneNews(
    url: string,
  ): Promise<DefaultResponse<ScrapeOneNews>> {
    try {
      await this.page.goto(url);

      const response: ScrapeOneNews = await this.page.evaluate(() => {
        const permittedTags = [
          "P",
          "IMG",
          "H1",
          "H2",
          "H3",
          "H4",
          "FIGURE",
          "UL",
        ];
        const postContent = document.querySelector(".post__content");

        const tags = [
          ...document.querySelectorAll<HTMLLIElement>(".tags__list li"),
        ].map((item) => item.innerText?.toLowerCase());

        [...postContent.childNodes].forEach((element) => {
          if (!permittedTags.includes(element.nodeName)) {
            element.remove();
          }
        }); // clear html content

        const content = postContent.innerHTML;

        const title = document.querySelector<HTMLElement>(
          ".post__header > .post__title",
        ).innerText;

        const excerpt = document.querySelector<HTMLElement>(
          ".post__header > .post__excerpt",
        ).innerText;

        const author = document.querySelector<HTMLLinkElement>(
          ".post__header .author__name",
        ).innerText;

        const publicationDate = document.querySelector<HTMLElement>(
          ".post__header .post__data",
        ).innerText;

        return {
          content,
          title,
          excerpt,
          author,
          publicationDate,
          tags,
          category: window.location.href.split("/")[3],
        };
      });

      return { success: "Bem sucessido", data: response };
    } catch (e) {
      console.log(e);
      return { error: "Não foi posssível acessar essa notícica" };
    }
  }
}
