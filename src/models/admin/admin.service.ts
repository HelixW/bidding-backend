import { Injectable } from '@nestjs/common'

@Injectable()
export class AdminService {
  registerAdmin(email: string): string {
    return email
  }
}
