import { Question } from '../../shared/types/question.interface'
import { Round } from '../../shared/types/round.interface'
import { BiddingController } from './bidding.controller'
import { Test, TestingModule } from '@nestjs/testing'
import { BiddingModule } from './bidding.module'
import { BiddingService } from './bidding.service'

describe('BiddingController', () => {
  let controller: BiddingController
  let service: BiddingService
  let questions: Array<Question>
  let res: Round

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BiddingModule],
    }).compile()

    controller = module.get<BiddingController>(BiddingController)
    service = module.get<BiddingService>(BiddingService)

    // Mock data
    questions = [
      {
        id: '1234',
        expiry: 1608190500000,
      },
      {
        id: '5678',
        expiry: 1608190500000,
      },
    ] as Array<Question>

    res = {
      name: 'Test Round',
      minBid: 200,
      questions,
    } as Round
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should initialize round', async () => {
    // Mock team creation
    jest.spyOn(service, 'initializeRound').mockImplementation(async () => res)

    expect(await controller.initializeRound('Test Round', questions, 200)).toBe(
      res
    )
  })
})
