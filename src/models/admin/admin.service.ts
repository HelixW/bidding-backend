import { Injectable } from '@nestjs/common'
import { hash as createHash, genSalt } from 'bcrypt'
import * as admin from 'firebase-admin'
import { Admin } from './admin.model'

@Injectable()
export class AdminService {
  // Register a new admin to the database
  async registerAdmin(email: string, password: string): Promise<Admin> {
    // Hash and salt strategy
    const saltRounds = 10
    const salt: string = await genSalt(saltRounds)
    const hash: string = await createHash(password, salt)

    const docRef = admin.firestore().collection('admin').doc(email)

    await docRef.set({ email, password: hash, verified: false })
    const createdUser = (await (await docRef.get()).data()) as Admin

    return {
      email: createdUser.email,
      verified: createdUser.verified,
    }
  }
}
