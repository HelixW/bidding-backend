import { NextFunction, Request, Response } from 'express'
import { validRound } from '../../config/validation/bidding.validator'
import { BadRequestException } from '@nestjs/common'

/*
 * validateRound middleware checks for a valid round format
 */
export const validateRound = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (validRound.validate(req.body).error)
    throw new BadRequestException({
      error: 'bidding-0001',
      message: 'Invalid round format encountered',
      detail: 'Ensure that the request body matches the required schema',
    })
  else next()
}
