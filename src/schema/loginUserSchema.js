import joi from "joi"

export const loginUserSchema = joi.object({
    password: joi.string().required(),
    email: joi.string().email().required()
})