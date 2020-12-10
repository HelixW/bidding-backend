/*
 * CreatedUser is the request DTO for team creation
 */
export class TeamInput {
  id: number
  teamName: string
  participants: Array<Participants>
}

/*
 * Participants DTO is used as a part of TeamInput
 */
export class Participants {
  googleID: string
  isLeader: boolean
}

/*
 * CreatedTeam is the response DTO of a successful team creation
 */
export class CreatedTeam {
  id: number
  teamName: string
  participants: Array<Participants>
  biddingPoints: number
  questions: Array<string>
}
