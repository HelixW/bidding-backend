import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AdminService } from './models/admin/admin.service'
import { AdminController } from './models/admin/admin.controller'
import { AdminModule } from './models/admin/admin.module'

@Module({
  imports: [AdminModule],
  controllers: [AppController, AdminController],
  providers: [AppService, AdminService],
})
export class AppModule {
  consumer.apply(cors(), helmet()).forRoutes(CatsController);
}
