import { Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { TeamsService } from './teams.service'

@ApiTags('Admin')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post('create')
  createTeam() {
    return this.teamsService.createTeam()
  }
}
