import { Module } from "@nestjs/common";
import { NewsModule } from "./modules/news/news.module";
import { ScraperModule } from "./modules/scraper/scraper.module";
import { ScheduleModule } from "@nestjs/schedule";
import { CategoryModule } from "./modules/category/category.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
@Module({
  imports: [
    NewsModule,
    ScraperModule,
    CategoryModule,
    ScheduleModule.forRoot(),
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      envFilePath: [".env.development", ".env.production", ".env"],
    }),
    JwtModule.register({
      global: true,
      secret: process.env["SECRET"],
      signOptions: {
        expiresIn: "10 days",
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
