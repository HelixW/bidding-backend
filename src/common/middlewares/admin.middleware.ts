import { NextFunction, Request, Response } from 'express'
import * as admin from 'firebase-admin'
import { validDetails } from '../../config/validation/admin.validator'
import { compare } from 'bcrypt'
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

export const checkExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body

  const snapshot = await admin
    .firestore()
    .collection('admin')
    .where('email', '==', email)
    .get()
  if (snapshot.empty) {
    next()
  } else
    res.status(400).json({
      error: 'auth-0002',
      message: 'User already exists',
      detail: 'An admin with the provided email already exists',
    })
}

export const checkRegistered = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body

  const adminRef = admin.firestore().collection('admin').doc(email)
  const doc = await adminRef.get()
  if (!doc.exists) {
    res.status(400).json({
      error: 'auth-0003',
      message: 'Invalid email or password',
      detail: 'Please check your email and password and try again',
    })
  } else if (!doc.data().verified)
    res.status(401).json({
      error: 'auth-0004',
      message: 'Admin not verified',
      detail: 'Your account has not been verified, please contact the author',
    })
  else {
    const validPassword = await compare(password, doc.data().password)
    if (!validPassword)
      res.status(401).json({
        error: 'auth-0003',
        message: 'Invalid Email or Password',
        detail: 'Please check your email and password and try again',
      })
    else next()
  }
}
