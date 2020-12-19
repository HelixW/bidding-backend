import { Round } from '../../shared/types/round.interface'
import { BadRequestException, Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { Question } from 'src/shared/types/question.interface'
@Injectable()
export class BiddingService {
  /*
   * initializeRound sets details of for the current round
   */
  async initializeRound(name, questions, startTime, minBid): Promise<Round> {
    const docRef = admin.firestore().collection('bidding').doc('details')

    // Assign time for each question and set allocated to false for each question
    let d = new Date(startTime)
    questions.forEach((question, i) => {
      // Set minimum bid
      if (i < 20) question.minBid = minBid
      else question.minBid = minBid * 2

      // Set start and expiry
      d = new Date(d.getTime() + 30000)
      question.start = d.getTime()
      d = new Date(d.getTime() + 150000)
      question.expiry = d.getTime()

      // Set allocated
      question.allocated = false
    })

    // Saving and fetching details of the new round
    await docRef.set({
      name,
      questions,
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

  /*
   * allocateQuestion sets allocated to true for the proviced questionID
   */
  async allocateQuestion(questionID) {
    const docRef = admin.firestore().collection('bidding').doc('details')
    const roundDetails = (await (await docRef.get()).data()) as Round

    // Check if question exists
    const question = roundDetails.questions.filter(
      (item: Question) => item.id === questionID
    )
    if (question.length === 0)
      throw new BadRequestException({
        error: 'bidding-0002',
        message: 'Invalid questionID provided',
        detail: 'A question with the proviced questionID does not exist',
      })

    // Check if already allocated
    if (question[0].allocated)
      throw new BadRequestException({
        error: 'bidding-0003',
        message: 'Question already allocated',
        detail:
          'The question with the questionID provided was already allocated',
      })

    // Update allocated
    roundDetails.questions.forEach((q) => {
      if (q.id === questionID) {
        console.log(q.id)
        console.log(questionID)
        q.allocated = true
      }
    })
    await docRef.set(roundDetails)

    const updatedDetails = (await (await docRef.get()).data()) as Round
    return updatedDetails
  }
}
