import { NestFactory } from '@nestjs/core';
import { setupCorsOrigin } from 'cors';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableCors({
  //   credentials: true,
  //   origin: setupCorsOrigin,
  // });

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
