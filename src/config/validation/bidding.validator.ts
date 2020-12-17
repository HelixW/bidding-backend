import * as Joi from 'joi'

/*
 * validRound is the request schema for an round user
 */
export const validRound = Joi.object({
  // Required :: Round name in string
  name: Joi.string().min(5).max(30).required(),

  // Required :: Questions are an array of questionIDs and their respective start
  // and expiry times
  questions: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        start: Joi.number().required(),
        expiry: Joi.number().required(),
      }).required()
    )
    .required(),

  // Required :: Minimum bid per question in the current round
  minBid: Joi.number().required(),
})
