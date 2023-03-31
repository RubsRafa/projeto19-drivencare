import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import errors from '../errors/index.js';
import pacientsRepositories from '../repositories/pacientsRepositories.js'

async function create({ name, email, password }) {
    const { rowCount } = await pacientsRepositories.findEmail(email);
    if (rowCount) throw errors.duplicatedEmailError('User already exists')

    const passwordHashed = bcrypt.hashSync(password, 10);
    await pacientsRepositories.create({ name, email, password: passwordHashed});
}

async function signin({ email, password }){
    const { rowCount, rows: [pacient] } = await pacientsRepositories.findEmail(email);
    if (!rowCount) throw errors.notFoundError('Incorrect email or password');
    
    const validPassword = await bcrypt.compare(password, pacient.password);
    if(!validPassword) throw errors.notFoundError('Incorrect email or password');

    const token = uuidV4();
    await pacientsRepositories.createSession({ token, id_pacient: pacient.id})

    return token;
}

export default {
    create,
    signin
}