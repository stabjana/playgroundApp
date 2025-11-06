import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  // pipe in nest js - functions that transform data
  signUp(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }
  // instead of if (!email) throw error we can use class transformer and class-validator library

  @Post('signin')
  signIn() {
    return this.authService.signIn();
  }
}
