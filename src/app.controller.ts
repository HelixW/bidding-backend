import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ServerStatus } from './common/dto/dummy.dto'

@ApiTags('Status')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*
   * getStatus is a dummy route which returns a string
   */
  @ApiOkResponse({ description: 'Dummy response', type: ServerStatus })
  @Get()
  getStatus(): { status: string } {
    return this.appService.getStatus()
  }
}
