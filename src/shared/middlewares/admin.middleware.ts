import { validAdmin } from '../../config/validation/admin.validator'
import { NextFunction, Request, Response } from 'express'
import * as admin from 'firebase-admin'
import { compare } from 'bcrypt'
import { verify } from 'jsonwebtoken'

/*
 * validateAdmin middleware checks for valid email and password
 * format at the time of admin registration/login
 */
export const validateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Invalid email or password format
  if (validAdmin.validate(req.body).error)
    res.status(400).json({
      error: 'auth-0001',
      message: 'Incorrect username and password',
      detail:
        'Ensure that the email is valid and the password provided fits the requirement',
    })
  else next()
}

/*
 * checkExists middleware checks if user with the given email already
 * exists at the time of admin registration
 */
export const checkExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body

  const user = await admin
    .firestore()
    .collection('admin')
    .where('email', '==', email)
    .get()

  if (user.empty) {
    // User does not exist
    next()
  } else
    res.status(400).json({
      error: 'auth-0002',
      message: 'User already exists',
      detail: 'An admin with the provided email already exists',
    })
}

/*
 * authenticate middleware checks for existing user, checks for verification
 * and matches password hash to the database document
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body

  const adminRef = admin.firestore().collection('admin').doc(email)
  const doc = await adminRef.get()

  if (!doc.exists) {
    // User with the given email does not exist
    res.status(400).json({
      error: 'auth-0003',
      message: 'Invalid email or password',
      detail: 'Please check your email and password and try again',
    })
  } else if (!doc.data().verified)
    // User has not been verified as an admin
    res.status(401).json({
      error: 'auth-0004',
      message: 'Admin not verified',
      detail: 'Your account has not been verified, please contact the author',
    })
  else {
    const validPassword = await compare(password, doc.data().password)

    // Invalid password
    if (!validPassword)
      res.status(401).json({
        error: 'auth-0005',
        message: 'Invalid Email or Password',
        detail: 'Please check your email and password and try again',
      })
    else next()
  }
}

/*
 * authorize middleware checks for a valid header for admin routes
 */
export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers

  // Header is missing
  if (!authorization)
    res.status(401).json({
      error: 'auth-0006',
      message: 'Unauthorized access',
      detail: 'No authorization header found',
    })
  // Bearer keyword missing
  else if (authorization.split(' ')[0] !== 'Bearer')
    res.status(401).json({
      error: 'auth-0007',
      message: 'Unauthorized access',
      detail: 'Bearer keyword missing from header',
    })
  else {
    const token = authorization.split(' ')[1]

    // JWT token missing
    if (!token)
      res.status(401).json({
        error: 'auth-0008',
        message: 'Unauthorized access',
        detail: 'JWT token was not provided',
      })
    else {
      try {
        verify(token, process.env.JWT_SECRET)
        next()
      } catch (_) {
        res.status(401).json({
          error: 'auth-0009',
          message: 'Unauthorized access',
          detail: 'JWT provided is malformed',
        })
      }
    }
  }
}
