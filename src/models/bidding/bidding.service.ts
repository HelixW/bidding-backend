import { Injectable } from '@nestjs/common'

@Injectable()
export class BiddingService {
  initializeDashboard(_name, _questions, _minBid) {
    return 'Hello'
  }
}
