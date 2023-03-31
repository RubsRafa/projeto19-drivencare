import errors from "../errors/index.js";
import patientsRepositories from "../repositories/patientsRepositories.js";

export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ','');

    if (!token) throw errors.unauthorizedError('Unauthorized: You need authorization to access this route');
    try {

        const { rows: [session] } = await patientsRepositories.findSession(token);
        if(!session) throw errors.unauthorizedError("Forbidden: You don't have permission to access this route");

        const { rows: [user] } = await patientsRepositories.findUserById({ id: session.id_patient });
        if (!user) throw errors.conflictError('User not found');

        res.locals.user = user;
        next();
        
    } catch (err) {
        next(err)
    }
}