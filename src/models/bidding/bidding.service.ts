import { Round } from '../../shared/types/round.interface'
import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'
@Injectable()
export class BiddingService {
  /*
   * initializeRound sets details of for the current round
   */
  async initializeRound(name, questions, startTime, minBid): Promise<Round> {
    const docRef = admin.firestore().collection('bidding').doc('details')

    // Assign time for each question and set allocated to false for each question
    let d = new Date(startTime)
    questions.forEach((question) => {
      d = new Date(d.getTime() + 30000)
      question.start = d.getTime()
      d = new Date(d.getTime() + 150000)
      question.expiry = d.getTime()
      question.allocated = false
    })

    // Saving and fetching details of the new round
    await docRef.set({
      name,
      questions,
      minBid,
      service: true,
    })
    const newRound = (await (await docRef.get()).data()) as Round
    return newRound
  }

  /*
   * fetchDetails gets the details of for the current round
   */
  async fetchDetails(): Promise<Round> {
    const docRef = admin.firestore().collection('bidding').doc('details')

    const newRound = (await (await docRef.get()).data()) as Round
    return newRound
  }
}
