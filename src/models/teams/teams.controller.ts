import { Body, Controller, Post } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Participants } from 'src/shared/types/teams.entity'
import { CreatedTeam, TeamInput } from './dto/team.dto'
import { TeamsService } from './teams.service'

@ApiTags('Teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @ApiBody({ type: TeamInput })
  @ApiCreatedResponse({
    description: 'Team created successfully',
    type: CreatedTeam,
  })
  @Post('create')
  @ApiBearerAuth()
  createTeam(
    @Body('id') id: number,
    @Body('teamName') teamName: string,
    @Body('participants') participants: Array<Participants>
  ) {
    return this.teamsService.createTeam(id, teamName, participants)
  }
}
