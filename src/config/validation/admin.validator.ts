import * as Joi from 'joi'

export const validDetails = Joi.object({
  // Standard email format with dot net or com domains
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  // Password requires 1 uppercase, 1 lowercase, 1 numeric and 1 symbolic character
  password: Joi.string()
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!#.])[A-Za-z\d$@$!%*?&.]{8,20}/
    )
    .required(),
})
