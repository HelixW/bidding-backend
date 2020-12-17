import { Body, Controller, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'
import { Question } from 'src/shared/types/question.interface'
import { BiddingService } from './bidding.service'
import { RoundDetails } from './dto/round.dto'

@ApiTags('Bidding')
@Controller('bidding')
export class BiddingController {
  constructor(private readonly biddingService: BiddingService) {}

  @ApiBearerAuth()
  @ApiBody({ type: RoundDetails })
  // @ApiCreatedResponse({
  //   description: 'Team created successfully',
  //   type: CreatedTeam,
  // })
  // @ApiBadRequestResponse({
  //   description: 'Invalid request body',
  //   type: ErrorResponse,
  // })
  // @ApiUnauthorizedResponse({
  //   description: 'Unauthorized action',
  //   type: ErrorResponse,
  // })
  @Post('initialize')
  initializeDashboard(
    @Body('name') name: string,
    @Body('questions') questions: Array<Question>,
    @Body('minBid') minBid: number
  ) {
    return this.biddingService.initializeDashboard(name, questions, minBid)
  }
}
