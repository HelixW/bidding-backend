export class TeamInput {
  id: number
  teamName: string
  participants: Array<Participants>
}

export class Participants {
  googleID: string
  isLeader: boolean
}

export class CreatedTeam {
  id: number
  teamName: string
  participants: Array<Participants>
  biddingPoints: number
  questions: Array<string>
}
