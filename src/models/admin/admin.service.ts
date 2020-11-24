import { Injectable } from '@nestjs/common'

@Injectable()
export class AdminService {
  // Register a new admin to the database
  registerAdmin(email: string): string {
    return email
  }
}
