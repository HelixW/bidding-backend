import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ExpressAdapter } from '@nestjs/platform-express'
import { ServiceAccount } from 'firebase-admin'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as admin from 'firebase-admin'
import * as Express from 'express'

// Health check
const server = Express()
server.get('/', (_, res) => res.send('OK'))
server.get('/_ah/health', (_, res) => res.send('OK'))

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server))

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

  // Global prefix
  app.setGlobalPrefix('api')

  // Swagger config
  const options = new DocumentBuilder()
    .setTitle('RC Bidding Portal')
    .setDescription("Bidding portal for ACM's reverse coding event")
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)

  await app.listen(process.env.PORT || 8080)
}
bootstrap()
