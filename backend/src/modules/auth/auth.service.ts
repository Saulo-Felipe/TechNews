import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import {
  ClassValidatorError,
  ClassValidatorSuccess,
} from "../../types/GeneralTypes";
import { User } from "@prisma/client";
import { SignUpDto } from "./dto/signUp.dto";
import { SignInDto } from "./dto/signIn.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  public async signUp(
    params: SignUpDto,
  ): Promise<ClassValidatorError | ClassValidatorSuccess> {
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [{ username: params.username }, { email: params.email }],
      },
    });

    if (user)
      return {
        error: true,
        message: ["Este nome de usuário ou email já está em uso"],
      };

    // encrypt password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(params.password, salt);

    const newUser: User = await this.prismaService.user.create({
      data: {
        ...params,
        password: hash,
      },
    });

    delete newUser.password;

    return {
      success: true,
      message: ["Usuário criado com sucesso"],
      data: newUser,
    };
  }

  public async signIn(
    params: SignInDto,
  ): Promise<ClassValidatorError | ClassValidatorSuccess> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: params.email,
      },
    });

    if (!user) {
      return { error: "Bad Request", message: ["Usuário não cadastrado"] };
    }

    const isEqual = bcrypt.compareSync(params.password, user.password);

    if (!isEqual) {
      return { error: "Bad Request", message: ["Senha ou email inválido"] };
    }

    const payload = {
      id: user.id,
    };

    return {
      success: "Sucesso",
      message: ["Login realizado com sucesso!"],
      data: await this.jwtService.signAsync(payload), // secret was configured globally
    };
  }
}
