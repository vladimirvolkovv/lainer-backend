import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useRequestLogging } from './middleware/request-logging';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(3050);
}
bootstrap();
