import bcrypt from 'bcrypt';
// import { v4 as uuidV4 } from 'uuid';
import pacientsRepositories from '../repositories/pacientsRepositories.js'

async function create({ name, email, password }) {
    const { rowCount } = await pacientsRepositories.findEmail(email);
    if (rowCount) throw new Error('User already exists.')

    const passwordHashed = bcrypt.hashSync(password, 10);
    await pacientsRepositories.create({ name, email, password: passwordHashed});
}

export default {
    create
}