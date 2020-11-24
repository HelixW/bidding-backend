import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import * as admin from 'firebase-admin'
import { ServiceAccount } from 'firebase-admin'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Firebase configuration
  const configService: ConfigService = app.get(ConfigService)
  const adminConfig: ServiceAccount = {
    projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
    privateKey: configService
      .get<string>('FIREBASE_PRIVATE_KEY')
      .replace(/\\n/g, '\n'),
    clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
  }

  // Initialize firebase
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: 'https://bidding-portal.firebaseio.com',
  })

  await app.listen(8000)
}
bootstrap()
