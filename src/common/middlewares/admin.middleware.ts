import { NextFunction, Request, Response } from 'express'
import { validDetails } from 'src/config/validation/admin.validator'

export const verifyDetails = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (validDetails.validate(req.body).error)
    res.status(400).json({
      status: 'error',
      message: 'incorrect email or password provided',
    })
  else next()
}
