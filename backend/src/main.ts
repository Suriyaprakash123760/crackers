import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true,  // Automatically transform payloads to DTO types
    whitelist: true,  // Automatically strip properties that are not part of the DTO
    forbidNonWhitelisted: true,  // Throw an error if non-whitelisted properties are found
  }));

  // Enable CORS using Nest's built-in CORS configuration
  app.enableCors({
    origin: 'http://localhost:3000', // specif y frontend URL
    credentials: true, // If your application needs cookies or auth headers
  });

  await app.listen(3005);
}

bootstrap();
