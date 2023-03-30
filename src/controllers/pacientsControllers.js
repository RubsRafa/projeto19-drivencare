import pacientsServices from "../services/pacientsServices.js";

async function signup(req, res) {
    const { name, email, password } = req.body;
    try {
        await pacientsServices.create({ name, email, password });
        return res.sendStatus(201)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
}

async function signin(req, res) {
    const { email, password } = req.body;

    try {

        const token = await pacientsServices.signin({ email, password });
        return res.status(200).send({ token })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}



export default {
    signup,
    signin
}