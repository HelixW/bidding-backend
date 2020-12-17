import { Question } from './question.interface'

export interface Round {
  name: string
  questions: Array<Question>
  minBid: number
}
