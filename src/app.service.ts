import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  // Returns the status of the running server
  getStatus(): string {
    return 'Server is online'
  }
}
