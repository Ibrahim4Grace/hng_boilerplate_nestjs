import { config } from 'dotenv';
config({ path: '.env.local' });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { ProductsSeed } from './products/products.seed';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });

  // Initialize other services and configurations
  const productsSeed = app.get(ProductsSeed);
  await productsSeed.run();

  const logger = app.get(Logger);

  app.enable('trust proxy');
  app.useLogger(logger);
  app.enableCors();

  // TODO: set options for swagger docs
  const options = new DocumentBuilder()
    .setTitle('<project-title-here>')
    .setDescription('<project-description-here>')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = app.get<ConfigService>(ConfigService).get<number>('server.port');
  await app.listen(port);

  logger.log({ message: 'server started 🚀', port, url: `http://localhost:${port}/api` });
}
bootstrap();
