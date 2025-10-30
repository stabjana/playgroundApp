import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { PlaygroundModule } from "./playground/playground.module";
import { AppController } from "./app.contoller";

@Module({
  imports: [AuthModule, UserModule, PlaygroundModule],
  controllers: [AppController],
})
export class AppModule {}
