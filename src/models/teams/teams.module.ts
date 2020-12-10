import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { authorize } from 'src/shared/middlewares/admin.middleware'
import {
  checkExists,
  validateTeam,
} from 'src/shared/middlewares/teams.middleware'
import { TeamsController } from './teams.controller'
import { TeamsService } from './teams.service'

@Module({
  imports: [],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {
  configure(consumer: MiddlewareConsumer) {
    // validateAdmin and checkExists middlewares for register route
    consumer
      .apply(validateTeam, checkExists, authorize)
      .forRoutes({ path: 'teams/create', method: RequestMethod.POST })
  }
}
