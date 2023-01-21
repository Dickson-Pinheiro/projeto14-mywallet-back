import joi from "joi"

export const transactionsSchema = joi.object({
    text: joi.string().required(),
    value: joi.number().required(),
    type: joi.string().valid("inflow", "outflow").required(),
})