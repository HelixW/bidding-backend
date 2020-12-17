import { TeamsController } from '../src/models/teams/teams.controller'
import { Participants, Team } from '../src/shared/types/teams.interface'
import { TeamsService } from '../src/models/teams/teams.service'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'

describe('AppController (e2e)', () => {
  let app: INestApplication

  // Mocks
  const participants = [
    {
      isLeader: true,
      googleID: 'Member A',
    },
    {
      isLeader: false,
      googleID: 'Member B',
    },
  ] as Array<Participants>
  const teamRes = {
    teamName: 'Testing',
    participants: participants,
    biddingPoints: 200,
    questions: [],
    id: '0',
  } as Team
  const teamsService = {
    createTeam: () => teamRes,
    fetchTeams: () => [teamRes],
    fetchTeam: () => teamRes,
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [TeamsController],
      providers: [TeamsService],
    })
      .overrideProvider(TeamsService)
      .useValue(teamsService)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/teams/create (POST)', () => {
    return request(app.getHttpServer())
      .post('/teams/create')
      .expect(201)
      .expect(teamRes)
  })

  it('/teams (POST)', () => {
    return request(app.getHttpServer())
      .get('/teams')
      .expect(200)
      .expect([teamRes])
  })

  it('/teams/0 (POST)', () => {
    return request(app.getHttpServer())
      .get('/teams/0')
      .expect(200)
      .expect(teamRes)
  })

  afterAll(async () => {
    await app.close()
  })
})
