import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  signUp(@Body() dto: any) {
    console.log({ dto });
    // signUp(@Req() req: Request) {
    // console.log(req.body); // req not needed for nest
    return this.authService.signUp();
  }

  @Post("signin")
  signIn() {
    return this.authService.signIn();
  }
}
