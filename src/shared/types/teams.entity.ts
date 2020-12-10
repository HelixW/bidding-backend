// Team response
export interface Team {
  id: string
  teamName: string
  participants: Participants
  biddingPoints: number
  questions: Array<string>
}

// Participant schema used inside interface Team
export interface Participants {
  googleID: string
  isLeader: boolean
}
