import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { AdminController } from './admin.controller'
import {
  checkExists,
  authenticate,
  verifyDetails,
} from '../../shared/middlewares/admin.middleware'
import { AdminService } from './admin.service'

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {
  configure(consumer: MiddlewareConsumer) {
    // verifyDetails and checkExists middlewares for register route
    consumer
      .apply(verifyDetails, checkExists)
      .forRoutes({ path: 'admin/register', method: RequestMethod.POST })

    // verifyDetails and authenticate middlewares for login route
    consumer
      .apply(verifyDetails, authenticate)
      .forRoutes({ path: 'admin/login', method: RequestMethod.POST })
  }
}
