import { MiddlewareConsumer, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AdminService } from './models/admin/admin.service'
import { AdminController } from './models/admin/admin.controller'
import { AdminModule } from './models/admin/admin.module'
import { ConfigModule } from '@nestjs/config'
import * as rateLimit from 'express-rate-limit'
import * as helmet from 'helmet'
import * as morgan from 'morgan'
import * as cors from 'cors'

@Module({
  imports: [ConfigModule.forRoot(), AdminModule],
  controllers: [AppController, AdminController],
  providers: [AppService, AdminService],
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
