import { AdminController } from './models/admin/admin.controller'
import { MiddlewareConsumer, Module } from '@nestjs/common'
import { AdminModule } from './models/admin/admin.module'
import { AppController } from './app.controller'
import * as rateLimit from 'express-rate-limit'
import { ConfigModule } from '@nestjs/config'
import { AppService } from './app.service'
import * as helmet from 'helmet'
import * as morgan from 'morgan'
import * as cors from 'cors'

@Module({
  imports: [ConfigModule.forRoot(), AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // Basic security
    const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 })
    consumer
      .apply(cors(), helmet(), morgan('common'), limiter)
      .forRoutes(AdminController)
  }
}
