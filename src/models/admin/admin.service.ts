import { Admin, Token } from '../../shared/types/admin.entity'
import { hash as createHash, genSalt } from 'bcrypt'
import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { sign } from 'jsonwebtoken'

@Injectable()
export class AdminService {
  /*
   * registerAdmin registers adds a new user to the admin collection
   * after hashing the password through bcrypt
   */
  async registerAdmin(email: string, password: string): Promise<Admin> {
    // Salt and hash strategy
    const saltRounds = 10
    const salt: string = await genSalt(saltRounds)
    const hash: string = await createHash(password, salt)

    const docRef = admin.firestore().collection('admin').doc(email)

    // Saving and fetching details of the new user
    await docRef.set({ email, password: hash, verified: false })
    const createdUser = (await (await docRef.get()).data()) as Admin

    return {
      email: createdUser.email,
      verified: createdUser.verified,
    }
  }

  /*
   * loginAdmin returns an access token (JWT) after successful login
   */
  async loginAdmin(email: string, _: string): Promise<Token> {
    const token: string = sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    return { token }
  }
}
