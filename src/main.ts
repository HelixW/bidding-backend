import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ServiceAccount } from 'firebase-admin'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as admin from 'firebase-admin'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Environment variables
  const configService: ConfigService = app.get(ConfigService)

  // Firebase configuration
  const adminConfig: ServiceAccount = {
    projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
    privateKey: configService
      .get<string>('FIREBASE_PRIVATE_KEY')
      .replace(/\\n/g, '\n'),
    clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
  }

  // Initialize Firebase
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: 'https://bidding-portal.firebaseio.com',
  })

  const options = new DocumentBuilder()
    .setTitle('RC Bidding Portal')
    .setDescription("Bidding portal for ACM's reverse coding event")
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)

  await app.listen(process.env.PORT || 8000)
}
bootstrap()
