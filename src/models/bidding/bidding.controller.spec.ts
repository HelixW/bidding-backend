import { Test, TestingModule } from '@nestjs/testing'
import { BiddingController } from './bidding.controller'

describe('BiddingController', () => {
  let controller: BiddingController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BiddingController],
    }).compile()

    controller = module.get<BiddingController>(BiddingController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
