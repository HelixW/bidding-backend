import { Injectable } from '@nestjs/common'
import { Participants, Team } from 'src/shared/types/teams.entity'
import * as admin from 'firebase-admin'

@Injectable()
export class TeamsService {
  /*
   * createTeam saves a new team to the database
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

  /*
   * fetchTeams returns the details of all teams
   */
  async fetchTeams() {
    const teamsRef = admin.firestore().collection('teams')

    // Create teams array
    const teams = []
    const snapshot = await teamsRef.get()
    snapshot.forEach((doc) => {
      teams.push(doc.data())
    })

    return teams
  }
}
