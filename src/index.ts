import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { http } from '@google-cloud/functions-framework';
import { Application } from './createNestFactory';
import { NestExpressApplication } from '@nestjs/platform-express';

http('nestjsApp', async (req, res) => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });
  const application = new Application(app);
  await application.bootstrap();

  const expressApp = app.getHttpAdapter().getInstance() as any;
  expressApp.handle(req, res);
});
