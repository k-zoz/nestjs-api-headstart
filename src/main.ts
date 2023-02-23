
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true // setting whitelist to true strips out the unwanted information passed through to the dto
  })) // use thsi validation pipe in the  main project a.k.a globally so as to ensure the validation reaches the whole project
  await app.listen(3333);
}
bootstrap();
