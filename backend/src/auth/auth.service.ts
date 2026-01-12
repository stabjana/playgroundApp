import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
// import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  async signIn(dto: AuthDto) {
    return 'I am signed in';
  }
}
