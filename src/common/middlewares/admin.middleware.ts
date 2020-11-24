import { NextFunction, Request, Response } from 'express'
import { validDetails } from 'src/config/validation/admin.validator'

/*
 * verifyDetails middleware checks for valid email and password
 * format at the time of admin registration/login
 */
export const verifyDetails = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Invalid email or password format
  if (validDetails.validate(req.body).error)
    res.status(400).json({
      error: 'auth-0001',
      message: 'Incorrect username and password',
      detail:
        'Ensure that the email is valid and the password provided fits the requirement',
    })
  else next()
}
