import { Body, Controller, Get, Post } from '@nestjs/common'
import { Question } from '../../shared/types/question.interface'
import { ErrorResponse } from '../../shared/dto/error.dto'
import { Round } from '../../shared/types/round.interface'
import { RoundDetails, RoundInput } from './dto/round.dto'
import { BiddingService } from './bidding.service'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
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
  @ApiBody({ type: RoundInput })
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
    @Body('startTime') startTime: string,
    @Body('minBid') minBid: number
  ): Promise<Round> {
    return this.biddingService.initializeRound(
      name,
      questions,
      startTime,
      minBid
    )
  }

  /*
   * fetchDetails controller returns the details of the current round
   */
  @ApiOkResponse({
    description: 'Successful fetch',
    type: RoundDetails,
  })
  @Get()
  fetchDetails(): Promise<Round> {
    return this.biddingService.fetchDetails()
  }
}
