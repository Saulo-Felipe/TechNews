import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/signUp.dto";
import { SignInDto } from "./dto/signIn.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signUp")
  async signUp(@Body() body: SignUpDto) {
    const response = await this.authService.signUp(body);

    return response;
  }

  @Post("signIn")
  async signIn(@Body() body: SignInDto) {
    const response = await this.authService.signIn(body);

    return response;
  }
}
