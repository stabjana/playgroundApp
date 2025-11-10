import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
// import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(dto: AuthDto) {
    // generate the password hash
    const hash = await argon2.hash(dto.password);
    // save the new user in db
    const user = await this.prisma.users.create({
      data: {
        email: dto.email,
        hash,
      },
      /* select: {
        id: true,
        email: true,
        createdAt: true,
      }, */
      // that part will be handled with transformer
    });

    // return the saved user
    return user;
  }

  signIn() {
    return 'I am signed in';
  }
}
