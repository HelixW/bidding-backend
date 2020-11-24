import { MiddlewareConsumer, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AdminService } from './models/admin/admin.service'
import { AdminController } from './models/admin/admin.controller'
import { AdminModule } from './models/admin/admin.module'
import * as rateLimit from 'express-rate-limit'
import * as helmet from 'helmet'
import * as morgan from 'morgan'
import * as cors from 'cors'

@Module({
  imports: [AdminModule],
  controllers: [AppController, AdminController],
  providers: [AppService, AdminService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 })
    consumer
      .apply(cors(), helmet(), morgan('common'), limiter)
      .forRoutes(AdminController)
  }
}
