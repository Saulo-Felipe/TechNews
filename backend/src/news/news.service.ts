import { Injectable } from "@nestjs/common";

@Injectable()
export class NewsService {
  getNews(id: string): string {
    return id;
  }
}
