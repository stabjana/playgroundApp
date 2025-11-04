import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@Injectable({})
export class AuthService {
  signUp() {
    return "I am signed up";
  }

  signIn() {
    return "I am signed in";
  }
}
