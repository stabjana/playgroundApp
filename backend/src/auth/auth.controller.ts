import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  // pipe in nest js - functions that transform data
  signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }
  // instead of if (!email) throw error we can use class transformer and class-validator library
}
