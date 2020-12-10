import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AdminService } from '../src/models/admin/admin.service'
import { AdminController } from '../src/models/admin/admin.controller'

describe('AdminController (e2e)', () => {
  let app: INestApplication

  // Mocks
  const registerRes = { email: 'test@test.com', verified: true }
  const loginRes = {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY2RAZ21haWwuY29tIiwiaWF0IjoxNjA3NTg1MDY2LCJleHAiOjE2MDgxODk4NjZ9.Xal6NfL3by9MzE3xGaaPcSng_CJ0L97AcxAzdQkIgmE',
  }
  const adminService = {
    registerAdmin: () => registerRes,
    loginAdmin: () => loginRes,
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AdminController],
      providers: [AdminService],
    })
      .overrideProvider(AdminService)
      .useValue(adminService)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/admin/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/admin/register')
      .expect(201)
      .expect(registerRes)
  })

  it('/admin/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/admin/login')
      .expect(200)
      .expect(loginRes)
  })

  afterAll(async () => {
    await app.close()
  })
})
