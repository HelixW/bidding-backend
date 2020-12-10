import * as Joi from 'joi'

/*
 * validAdmin is the request schema for an admin user
 */
export const validAdmin = Joi.object({
  // Required :: Standard email format with supporting .com, .net, .in
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'in'] },
    })
    .required(),

  // Required :: Password requires 1 uppercase, 1 lowercase, 1 numeric and 1 symbolic character
  password: Joi.string()
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!#.])[A-Za-z\d$@$!%*?&.]{8,20}/
    )
    .required(),
})
