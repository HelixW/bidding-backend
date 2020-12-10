import { Test, TestingModule } from '@nestjs/testing'
import { TeamsController } from './teams.controller'
import { TeamsModule } from './teams.module'

describe('TeamsController', () => {
  let controller: TeamsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TeamsModule],
    }).compile()

    controller = module.get<TeamsController>(TeamsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
