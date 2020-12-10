import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { AdminController } from './admin.controller'
import {
  checkExists,
  authenticate,
  validateAdmin,
} from '../../shared/middlewares/admin.middleware'
import { AdminService } from './admin.service'

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {
  configure(consumer: MiddlewareConsumer) {
    // validateAdmin and checkExists middlewares for register route
    consumer
      .apply(validateAdmin, checkExists)
      .forRoutes({ path: 'admin/register', method: RequestMethod.POST })

    // validateAdmin and authenticate middlewares for login route
    consumer
      .apply(validateAdmin, authenticate)
      .forRoutes({ path: 'admin/login', method: RequestMethod.POST })
  }
}
