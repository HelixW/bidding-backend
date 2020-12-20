/*
 * RoundDetails is the request DTO supplying essential details for a round
 */
export class RoundDetails {
  name: string
  questions: Array<Question>
  service: boolean
}

/*
 * Question DTO is used as a part of RoundDetails
 */
export class Question {
  id: string
  start: number
  expiry: number
  allocated: boolean
  minBid: number
}

/*
 * RoundInput is the request DTO used to initialize rounds
 */
export class RoundInput {
  name: string
  startTime: string
  questions: Array<QuestionInput>
  minBid: number
}

/*
 * QuestionInput DTO is used as a part of RoundInput
 */
export class QuestionInput {
  id: string
}

export class AllocateInput {
  id: string
  teamID: string
}
