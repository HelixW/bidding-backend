import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AdminModule } from './../src/models/admin/admin.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AdminModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/admin/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/admin/register')
      .expect(400)
      .expect({
        error: 'auth-0001',
        message: 'Incorrect username and password',
        detail:
          'Ensure that the email is valid and the password provided fits the requirement',
      })
  })

  it('/admin/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/admin/login')
      .expect(400)
      .expect({
        error: 'auth-0001',
        message: 'Incorrect username and password',
        detail:
          'Ensure that the email is valid and the password provided fits the requirement',
      })
  })
})
