import joi from "joi";

const patientSchemaSignUp = joi.object({
    name: joi.string().not('').min(3).required(),
    email: joi.string().not('').regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).required(),
    password: joi.string().not('').required()
});

const schemaSignIn = joi.object({
    email: joi.string().not('').regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).required(),
    password: joi.string().not('').required()
});

const doctorSchemaSignUp = joi.object({
    name: joi.string().not('').min(3).required(),
    email: joi.string().not('').regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).required(),
    password: joi.string().not('').required(),
    specialty: joi.number().not('').required(),
    location: joi.number().not('').required()
})

const doctorAvailableTime = joi.object({
    date: joi.string().regex(/^\d{4}-\d{2}-\d{2}$/).isoDate().required(),
    time: joi.string().regex(/^\d{2}:00:00$/).required()
})

export default {
    patientSchemaSignUp,
    schemaSignIn,
    doctorSchemaSignUp,
    doctorAvailableTime
}