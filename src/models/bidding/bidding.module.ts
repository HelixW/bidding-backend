import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { validateRound } from '../../shared/middlewares/bidding.middleware'
import { authorize } from '../../shared/middlewares/auth.middleware'
import { BiddingController } from './bidding.controller'
import { BiddingService } from './bidding.service'

@Module({
  controllers: [BiddingController],
  providers: [BiddingService],
})
export class BiddingModule {
  configure(consumer: MiddlewareConsumer) {
    // validateRound, and authorize middlewares for
    // round initialization route
    consumer
      .apply(validateRound, authorize)
      .forRoutes({ path: 'bidding/initialize', method: RequestMethod.POST })
  }
}
