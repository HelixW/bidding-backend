export interface Team {
  id: string
  teamName: string
  participants: Participants
  biddingPoints: number
  questions: Array<string>
}

export interface Participants {
  googleID: string
  isLeader: boolean
}
