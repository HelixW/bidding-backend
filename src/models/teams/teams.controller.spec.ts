import { Test, TestingModule } from '@nestjs/testing'
import { TeamsController } from './teams.controller'
import { TeamsService } from './teams.service'
import { TeamsModule } from './teams.module'
import { Team } from '../../shared/types/teams.interface'
import { Participants } from './dto/team.dto'

describe('TeamsController', () => {
  let controller: TeamsController
  let service: TeamsService
  let participants: Array<Participants>
  let res: Team

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TeamsModule],
    }).compile()

    controller = module.get<TeamsController>(TeamsController)
    service = module.get<TeamsService>(TeamsService)

    // Mock data
    participants = [
      {
        isLeader: true,
        googleID: 'Member A',
      },
      {
        isLeader: false,
        googleID: 'Member B',
      },
    ] as Array<Participants>
    res = {
      teamName: 'Testing',
      participants: participants,
      biddingPoints: 200,
      questions: [],
      id: '0',
    } as Team
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create new team', async () => {
    // Mock team creation
    jest.spyOn(service, 'createTeam').mockImplementation(async () => res)

    expect(await controller.createTeam(0, 'Testing', participants)).toBe(res)
  })

  it('should return list of teams', async () => {
    // Mock team creation
    const list = [res]
    jest.spyOn(service, 'fetchTeams').mockImplementation(async () => list)

    expect(await controller.fetchTeams()).toBe(list)
  })

  it('should return single team', async () => {
    // Mock team creation
    const team = res
    jest.spyOn(service, 'fetchTeam').mockImplementation(async () => team)

    expect(await controller.fetchTeam(0)).toBe(team)
  })
})
