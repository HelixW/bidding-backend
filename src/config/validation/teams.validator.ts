import * as Joi from 'joi'

/*
 * validTeam is the request schema for a team
 */
export const validTeam = Joi.object({
  // Required :: Team ID
  id: Joi.number().required(),

  // Required :: Team name (min: 3 characters, max: 15 characters)
  teamName: Joi.string().min(3).max(15).required(),

  // Required :: Participant details (max: 2 elements)
  participants: Joi.array()
    .items(
      Joi.object({
        googleID: Joi.string().required(),
        isLeader: Joi.boolean().required(),
      }).required()
    )
    .max(2)
    .required(),
})
