import { Module } from "@nestjs/common";
import { ScraperService } from "./scraper.service";
import { ScraperContoller } from "./scraper.controller";
import { PrismaService } from "../../database/prisma.service";
import { SocketGateway } from "./socket.gateway";

@Module({
  imports: [],
  controllers: [ScraperContoller],
  providers: [ScraperService, PrismaService, SocketGateway],
})
export class ScraperModule {}
