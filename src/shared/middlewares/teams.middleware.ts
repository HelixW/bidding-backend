import { NextFunction, Request, Response } from 'express'
import { validTeam } from 'src/config/validation/teams.validator'
import * as admin from 'firebase-admin'

/*
 * validateTeam middleware checks for a valid team format
 */
export const validateTeam = (
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

/*
 * checkExists middleware checks if a team with the provided ID already
 * exists
 */
export const checkExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body

  const team = await admin
    .firestore()
    .collection('teams')
    .where('id', '==', id)
    .get()

  if (team.empty) {
    // Team with given ID doesn't exist
    next()
  } else
    res.status(400).json({
      error: 'team-0002',
      message: 'Team already exists',
      detail: 'Team with the provided ID already exists',
    })
}
