import { Injectable } from '@nestjs/common'
import { Participants, Team } from 'src/shared/types/teams.entity'
import * as admin from 'firebase-admin'

@Injectable()
export class TeamsService {
  /*
   *
   */
  async createTeam(
    id: number,
    teamName: string,
    participants: Array<Participants>
  ) {
    const docRef = admin.firestore().collection('teams').doc(id.toString())

    // Saving and fetching details of the new team
    await docRef.set({
      id,
      teamName,
      participants,
      biddingPoints: 200,
      questions: [],
    })
    const createdTeam = (await (await docRef.get()).data()) as Team

    return createdTeam
  }
}
