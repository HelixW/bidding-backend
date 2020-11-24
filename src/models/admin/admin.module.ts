import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import {
  checkExists,
  checkRegistered,
  verifyDetails,
} from '../../common/middlewares/admin.middleware'
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {
  // Apply verifyDetails middleware for all admin routes
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(verifyDetails, checkExists)
      .forRoutes({ path: 'admin/register', method: RequestMethod.POST })
    consumer
      .apply(verifyDetails, checkRegistered)
      .forRoutes({ path: 'admin/login', method: RequestMethod.POST })
  }
}
