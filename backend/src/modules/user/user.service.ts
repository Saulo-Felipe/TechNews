import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getUserData(userId: number) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
    }

    return user;
  }
}
