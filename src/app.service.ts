import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  /*
   * Returns a dummy response
   */
  getStatus(): string {
    return 'Server is online'
  }
}
