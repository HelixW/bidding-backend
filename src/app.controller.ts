import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*
   * Shows server status
   */
  @Get()
  getStatus(): string {
    return this.appService.getStatus()
  }
}
