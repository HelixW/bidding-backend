import { BadRequestException, UnauthorizedException } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import * as admin from 'firebase-admin'
import { verify } from 'jsonwebtoken'
import { JWT } from '../types/auth.entity'

/*
 * authorize middleware checks for a valid header for admin routes
 */
export const authorize = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers

  // Header is missing
  if (!authorization)
    throw new UnauthorizedException({
      error: 'auth-0006',
      message: 'Unauthorized access',
      detail: 'No authorization header found',
    })
  // Bearer keyword missing
  else if (authorization.split(' ')[0] !== 'Bearer')
    throw new UnauthorizedException({
      error: 'auth-0007',
      message: 'Unauthorized access',
      detail: 'Bearer keyword missing from header',
    })
  else {
    const token = authorization.split(' ')[1]

    // JWT token missing
    if (!token)
      throw new UnauthorizedException({
        error: 'auth-0008',
        message: 'Unauthorized access',
        detail: 'JWT token was not provided',
      })
    else {
      try {
        // Verify token
        const verifiedToken = verify(token, process.env.JWT_SECRET) as JWT
        const adminRef = admin
          .firestore()
          .collection('admin')
          .doc(verifiedToken.email)
        const doc = await adminRef.get()

        if (!doc.exists)
          throw new BadRequestException({
            error: 'auth-0009',
            message: 'Unauthorized access',
            detail: 'Invalid token provided',
          })
        else next()
      } catch (_) {
        throw new UnauthorizedException({
          error: 'auth-0010',
          message: 'Unauthorized access',
          detail: 'JWT provided is malformed',
        })
      }
    }
  }
}
