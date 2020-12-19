import { Question } from './question.interface'

export interface Round {
  name: string
  startTime: string
  questions: Array<Question>
}
