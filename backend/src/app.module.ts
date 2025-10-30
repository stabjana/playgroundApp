import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from './user/user.module';
import { PlaygroundModule } from './playground/playground.module';

@Module({
  imports: [AuthModule, UserModule, PlaygroundModule],
})
export class AppModule {}
