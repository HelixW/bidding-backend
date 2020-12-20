import { BiddingController } from './models/bidding/bidding.controller'
import { AdminController } from './models/admin/admin.controller'
import { TeamsController } from './models/teams/teams.controller'
import { BiddingModule } from './models/bidding/bidding.module'
import { MiddlewareConsumer, Module } from '@nestjs/common'
import { AdminModule } from './models/admin/admin.module'
import { TeamsModule } from './models/teams/teams.module'
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config'
import { AppService } from './app.service'
import * as helmet from 'helmet'
import * as morgan from 'morgan'

@Module({
  imports: [ConfigModule.forRoot(), AdminModule, TeamsModule, BiddingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // Basic security
    consumer
      .apply(helmet(), morgan('common'))
      .forRoutes(AdminController, TeamsController, BiddingController)
  }
}
