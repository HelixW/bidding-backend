import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*
   * getStatus is a dummy route which returns a string
   */
  @Get()
  getStatus(): string {
    return this.appService.getStatus()
  }
}
