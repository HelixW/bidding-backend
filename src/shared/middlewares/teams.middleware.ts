import { NextFunction, Request, Response } from 'express'
import { validTeam } from 'src/config/validation/teams.validator'

export const validateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (validTeam.validate(req.body).error)
    res.status(400).json({
      error: 'team-0001',
      message: 'Invalid team format encountered',
      detail: 'Ensure that the request body matches the required schema',
    })
  else next()
}
