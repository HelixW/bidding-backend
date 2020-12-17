import { Body, Controller, Post } from '@nestjs/common'
import { Question } from 'src/shared/types/question.interface'
import { ErrorResponse } from 'src/shared/dto/error.dto'
import { Round } from 'src/shared/types/round.interface'
import { BiddingService } from './bidding.service'
import { RoundDetails } from './dto/round.dto'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

@ApiTags('Bidding')
@Controller('bidding')
export class BiddingController {
  constructor(private readonly biddingService: BiddingService) {}

  /*
   * initializeRound controller sets details for each bidding round
   */
  @ApiBearerAuth()
  @ApiBody({ type: RoundDetails })
  @ApiCreatedResponse({
    description: 'Round created successfully',
    type: RoundDetails,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request body',
    type: ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized action',
    type: ErrorResponse,
  })
  @Post('initialize')
  initializeRound(
    @Body('name') name: string,
    @Body('questions') questions: Array<Question>,
    @Body('minBid') minBid: number
  ): Promise<Round> {
    return this.biddingService.initializeRound(name, questions, minBid)
  }
}
