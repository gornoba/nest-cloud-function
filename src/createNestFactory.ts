import { NestExpressApplication } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';

dotenv.config();

export class Application {
  private DEV_MODE: boolean;

  constructor(private server: NestExpressApplication) {
    this.server = server;
    this.DEV_MODE = process.env.ENVIRONMENT === 'development';
  }

  private setUpGlobalMiddleware() {
    if (this.DEV_MODE) {
      this.server.enableCors({
        origin: process.env.DEV_CORS_ORIGIN,
        methods: process.env.CORS_METHOD,
        allowedHeaders: process.env.CORS_ALLOWEDHEADERS,
      });
    } else {
      this.server.enableCors({
        origin: process.env.PROD_CORS_ORIGIN,
        methods: process.env.CORS_METHOD,
        allowedHeaders: process.env.CORS_ALLOWEDHEADERS,
      });
    }
  }

  async bootstrap() {
    this.setUpGlobalMiddleware();

    if (this.DEV_MODE) {
      await this.server.listen(3000);
    } else {
      await this.server.init();
    }
  } 
}
