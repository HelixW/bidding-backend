import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { authorize } from '../../shared/middlewares/auth.middleware'
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
    // validateTeam, checkExists, and authorize middlewares for
    // team creation route
    consumer
      .apply(validateTeam, checkExists, authorize)
      .forRoutes({ path: 'teams/create', method: RequestMethod.POST })
  }
}
