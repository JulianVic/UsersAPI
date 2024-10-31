import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api")
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET, HEAD, POST, PATCH, DELETE',
    credentials: true
  })

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
