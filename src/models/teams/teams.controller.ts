import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { ErrorResponse } from 'src/shared/dto/error.dto'
import { Participants, Team } from 'src/shared/types/teams.entity'
import { CreatedTeam, TeamInput } from './dto/team.dto'
import { TeamsService } from './teams.service'

@ApiTags('Teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  /*
   * createTeam controller creates a new team after validating
   * input, checking if a team with the same ID already exists and
   * checking for proper authorization
   */
  @ApiBearerAuth()
  @ApiBody({ type: TeamInput })
  @ApiCreatedResponse({
    description: 'Team created successfully',
    type: CreatedTeam,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request body',
    type: ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized action',
    type: ErrorResponse,
  })
  @Post('create')
  createTeam(
    @Body('id') id: number,
    @Body('teamName') teamName: string,
    @Body('participants') participants: Array<Participants>
  ): Promise<Team> {
    return this.teamsService.createTeam(id, teamName, participants)
  }

  /*
   * fetchTeams controller fetches details of all teams
   */
  @ApiOkResponse({ description: 'Successful teams fetch', type: [CreatedTeam] })
  @Get()
  fetchTeams(): Promise<Array<Team>> {
    return this.teamsService.fetchTeams()
  }

  /*
   * fetchTeams controller fetches details of a single team
   */
  @ApiOkResponse({ description: 'Successful team fetch', type: CreatedTeam })
  @Get(':id')
  fetchTeam(@Param('id') id: number): Promise<Team> {
    return this.teamsService.fetchTeam(id)
  }
}
