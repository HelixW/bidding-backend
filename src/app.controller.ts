import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ServerStatus } from './shared/dto/dummy.dto'
import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@ApiTags('Status')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*
   * getStatus is a dummy route
   */
  @ApiOkResponse({ description: 'Dummy response', type: ServerStatus })
  @Get()
  getStatus(): { status: string } {
    return this.appService.getStatus()
  }
}
