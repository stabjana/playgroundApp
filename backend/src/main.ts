import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(
      AppModule,
    );
  // use validation pipe globally
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3333);
}
bootstrap();
