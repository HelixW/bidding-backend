import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Server is online')
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
})
