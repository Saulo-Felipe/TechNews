import { IsEmail, MinLength } from "class-validator";

export class SignUpDto {
  @IsEmail({}, { message: "Email inválido" })
  email: string;

  @MinLength(6, { message: "A senha deve ter pelo menos 6 caracteres." })
  password: string;

  @MinLength(3, { message: "O username deve ter pelo menos 3 caracteres." })
  username: string;
}
