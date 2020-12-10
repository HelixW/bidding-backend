import { Test, TestingModule } from '@nestjs/testing'
import { AdminController } from './admin.controller'
import { AdminModule } from './admin.module'
import { AdminService } from './admin.service'

describe('AdminController', () => {
  let controller: AdminController
  let service: AdminService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AdminModule],
    }).compile()

    controller = module.get<AdminController>(AdminController)
    service = module.get<AdminService>(AdminService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should register new admin', async () => {
    // Mock registration
    const res = { email: 'test@test.com', verified: true }
    jest.spyOn(service, 'registerAdmin').mockImplementation(async () => res)

    expect(await controller.registerAdmin('test@test.com', 'Testing123')).toBe(
      res
    )
  })
  it('should login admin', async () => {
    // Mock login
    const res = {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY2RAZ21haWwuY29tIiwiaWF0IjoxNjA3NTg1MDY2LCJleHAiOjE2MDgxODk4NjZ9.Xal6NfL3by9MzE3xGaaPcSng_CJ0L97AcxAzdQkIgmE',
    }
    jest.spyOn(service, 'loginAdmin').mockImplementation(async () => res)

    expect(await controller.loginAdmin('test@test.com', 'Testing123')).toBe(res)
  })
})
