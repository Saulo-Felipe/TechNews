import { IsEmail, MinLength } from "class-validator";

export class SignInDto {
  @IsEmail({}, { message: "Email inválido" })
  email: string;

  @MinLength(6, { message: "A senha deve ter pelo menos 6 caracteres." })
  password: string;
}
