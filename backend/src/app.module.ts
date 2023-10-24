import { Module } from "@nestjs/common";
import { NewsModule } from "./news/news.module";
import { ScraperModule } from "./scraper/scraper.module";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [NewsModule, ScraperModule, ScheduleModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
