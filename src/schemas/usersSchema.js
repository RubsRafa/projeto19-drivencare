import joi from "joi";

const pacientSchema = joi.object({
    name: joi.string().not('').min(3).required(),
    email: joi.string().not('').regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).required(),
    password: joi.string().not('').required()
});

const doctortSchema = joi.object({
    name: joi.string().not('').min(3).required(),
    email: joi.string().not('').regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).required(),
    password: joi.string().not('').required(),
    specialty: joi.string().not('').required()
})

export default {
    pacientSchema,
    doctortSchema
}