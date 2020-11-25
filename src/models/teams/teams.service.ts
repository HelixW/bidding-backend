import { Injectable } from '@nestjs/common'

@Injectable()
export class TeamsService {
  createTeam() {
    return { status: 'Works' }
  }
}
