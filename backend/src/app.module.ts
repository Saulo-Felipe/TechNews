import { Module } from "@nestjs/common";
import { NewsModule } from "./news/news.module";
import { ScraperModule } from "./scraper/scraper.module";
import { ScheduleModule } from "@nestjs/schedule";
import { CategoryModule } from "./category/category.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    NewsModule,
    ScraperModule,
    CategoryModule,
    ScheduleModule.forRoot(),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
