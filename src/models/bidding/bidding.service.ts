import { Round } from 'src/shared/types/round.interface'
import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'

@Injectable()
export class BiddingService {
  /*
   * initializeRound sets details of for the current round
   */
  async initializeRound(name, questions, minBid): Promise<Round> {
    const docRef = admin.firestore().collection('bidding').doc('details')

    // Saving and fetching details of the new round
    await docRef.set({
      name,
      questions,
      minBid,
    })
    const newRound = (await (await docRef.get()).data()) as Round
    return newRound
  }
}
