import db from '../config/db.js';

async function findEmail(email){
    return await db.query(`SELECT * FROM users_pacients WHERE email = $1;`, [email]);
}

async function create({ name, email, password }) {
    return await db.query('INSERT INTO users_pacients (name, email, password) VALUES ($1, $2, $3);', [name, email, password]);
}

async function createSession({ token, id_pacient}) {
    return await db.query('INSERT INTO sessions_pacients (id_pacient, token) VALUES ($1, $2);', [id_pacient, token])
}

export default {
    findEmail,
    create,
    createSession
}