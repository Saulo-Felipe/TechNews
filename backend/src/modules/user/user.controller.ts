import { Body, Controller, Post } from "@nestjs/common";
import { GetUserDataDto } from "./dto/getUserData.dto";
import { PrismaService } from "../../database/prisma.service";
import { JwtService } from "@nestjs/jwt";

@Controller("user")
export class UserController {
  constructor(
    private readonly prismaService: PrismaService,
    readonly jwtService: JwtService,
  ) {}

  @Post("get-data")
  public async getUserData(@Body() { token }: GetUserDataDto) {
    try {
      const { id } = await this.jwtService.verifyAsync(token); // secret was configured globally

      const user = await this.prismaService.user.findUnique({
        where: { id },
      });

      delete user["password"];

      return user;
    } catch (e) {
      return {};
    }
  }
}
