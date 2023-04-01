import errors from "../errors/index.js";
import doctorsRepositories from "../repositories/doctorsRepositories.js";
import patientsRepositories from "../repositories/patientsRepositories.js";
import jwt from "jsonwebtoken";

export async function validateTokenPatient(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) throw errors.unauthorizedError('Unauthorized: You need authorization to access this route');

    const parts = authorization.split(' ');
    if (parts.length !== 2) throw errors.unauthorizedError('Unauthorized: You need authorization to access this route');

    const [schema, token] = parts;
    if (schema !== 'Bearer') throw errors.unauthorizedError('Unauthorized: You need authorization to access this route');

    jwt.verify(token, process.env.SECRET_KEY_JWT, async (error, decoded) => {
        
        try {
            if(error) throw errors.unauthorizedError('Unauthorized: You need authorization to access this route');

            const { rows: [patient] } = await patientsRepositories.findUserById({ id:decoded.id_patient});
            
            if (!patient) throw errors.unauthorizedError('Unauthorized: You need authorization to access this route');

            res.locals.user = patient;
            next()
            
        } catch (err) {
            next(err)
        }
    })
    
}

export async function validateTokenDoctor(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) throw errors.unauthorizedError('Unauthorized: You need authorization to access this route');

    const parts = authorization.split(' ');
    if (parts.length !== 2) throw errors.unauthorizedError('Unauthorized: You need authorization to access this route');

    const [schema, token] = parts;
    if (schema !== 'Bearer') throw errors.unauthorizedError('Unauthorized: You need authorization to access this route');

    jwt.verify(token, process.env.SECRET_KEY_JWT, async (error, decoded) => {

        try {

            if(error) throw errors.unauthorizedError('Unauthorized: You need authorization to access this route');

            const { rows: [doctor] } = await doctorsRepositories.findUserById({ id: decoded.id_doctor });

            if(!doctor) throw errors.unauthorizedError('Unauthorized: You need authorization to access this route');

            res.locals.user = doctor;
            next();
            
        } catch (err) {
            next(err)
        }
    })
}