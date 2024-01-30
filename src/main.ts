import { NestFactory } from '@nestjs/core';
import { MainModule } from './modules/main.module';
import { Logger } from '@nestjs/common';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  await app.listen(3000);

  Logger.log(`http://localhost:3000/ticker (create ticket)`, 'api');
  Logger.log(`http://localhost:3000/order (create order)`, 'api');
}
bootstrap();
