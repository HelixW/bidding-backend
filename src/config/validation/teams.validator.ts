import * as Joi from 'joi'

export const validTeam = Joi.object({
  id: Joi.number().required(),
  teamName: Joi.string().min(3).max(15).required(),
  participants: Joi.array()
    .items(
      Joi.object({
        googleID: Joi.string().required(),
        isLeader: Joi.boolean().required(),
      }).required()
    )
    .required(),
})
