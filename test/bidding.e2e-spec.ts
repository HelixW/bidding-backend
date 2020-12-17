import { BiddingController } from '../src/models/bidding/bidding.controller'
import { BiddingService } from '../src/models/bidding/bidding.service'
import { Question } from '../src/shared/types/question.interface'
import { Round } from '../src/shared/types/round.interface'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'

describe('BiddingController (e2e)', () => {
  let app: INestApplication

  // Mocks
  const questions = [
    {
      id: '1234',
      start: 1608190500000,
      expiry: 1608190500000,
    },
    {
      id: '5678',
      start: 1608190500000,
      expiry: 1608190500000,
    },
  ] as Array<Question>

  const roundRes = {
    name: 'Test Round',
    minBid: 200,
    questions,
  } as Round
  const biddingService = {
    initializeRound: () => roundRes,
    fetchDetails: () => roundRes,
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [BiddingController],
      providers: [BiddingService],
    })
      .overrideProvider(BiddingService)
      .useValue(biddingService)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/bidding/initialize (POST)', () => {
    return request(app.getHttpServer())
      .post('/bidding/initialize')
      .expect(201)
      .expect(roundRes)
  })

  it('/bidding (GET)', () => {
    return request(app.getHttpServer())
      .get('/bidding')
      .expect(200)
      .expect(roundRes)
  })

  afterAll(async () => {
    await app.close()
  })
})
