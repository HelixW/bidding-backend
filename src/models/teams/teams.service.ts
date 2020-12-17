import { Participants, Team } from '../../shared/types/teams.interface'
import { Injectable, NotFoundException } from '@nestjs/common'
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
  ): Promise<Team> {
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
  async fetchTeams(): Promise<Array<Team>> {
    const teamsRef = admin.firestore().collection('teams')

    // Create teams array
    const teams = []
    const snapshot = await teamsRef.get()
    snapshot.forEach((doc) => {
      teams.push(doc.data())
    })

    return teams
  }

  /*
   * fetchTeam returns the details of a single team
   */
  async fetchTeam(id: number): Promise<Team> {
    const teamRef = await admin
      .firestore()
      .collection('teams')
      .doc(id.toString())
      .get()

    // Team not found
    if (!teamRef.exists)
      throw new NotFoundException({
        error: 'teams-0003',
        message: 'Invalid teamID proved',
        detail: 'The team with the teamID provided does not exist',
      })

    const team = teamRef.data() as Team

    return team
  }
}
