import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import errors from '../errors/index.js';
import patientsRepositories from '../repositories/patientsRepositories.js'

async function create({ name, email, password }) {
    const { rowCount } = await patientsRepositories.findEmail(email);
    if (rowCount) throw errors.duplicatedEmailError('User already exists')

    const passwordHashed = bcrypt.hashSync(password, 10);
    await patientsRepositories.create({ name, email, password: passwordHashed});
}

async function signin({ email, password }){
    const { rowCount, rows: [patient] } = await patientsRepositories.findEmail(email);
    if (!rowCount) throw errors.notFoundError('Incorrect email or password');
    
    const validPassword = await bcrypt.compare(password, patient.password);
    if(!validPassword) throw errors.notFoundError('Incorrect email or password');

    const token = uuidV4();
    await patientsRepositories.createSession({ token, id_patient: patient.id})

    return token;
}

export default {
    create,
    signin
}