import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { verifyDetails } from 'src/common/middlewares/admin.middleware'

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AdminModule {
  // Apply verifyDetails middleware for all admin routes
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(verifyDetails)
      .forRoutes({ path: 'admin/*', method: RequestMethod.POST })
  }
}
