import joi from "joi"

export const updateTransactionSchema = joi.object({
    text: joi.string().required(),
    value: joi.number().required()
})