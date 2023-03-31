import patientsServices from "../services/patientsServices.js";

async function signup(req, res, next) {
    const { name, email, password } = req.body;
    try {
        await patientsServices.create({ name, email, password });
        return res.sendStatus(201)
        
    } catch (err) {
        next(err)
    }
}

async function signin(req, res, next) {
    const { email, password } = req.body;

    try {

        const token = await patientsServices.signin({ email, password });
        return res.status(200).send({ token })
        
    } catch (err) {
        next(err)
    }
}



export default {
    signup,
    signin
}