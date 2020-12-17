/*
 * RoundDetails is the request DTO supplying essential details for a round
 */
export class RoundDetails {
  name: string
  questions: Array<Question>
  minBid: number
}

/*
 * Question DTO is used as a part of RoundDetails
 */
export class Question {
  id: string
  expiry: Date
}
