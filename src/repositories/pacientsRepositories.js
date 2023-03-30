import db from '../config/db.js';

async function findEmail(email){
    return await db.query(`SELECT * FROM users_pacients WHERE email = $1;`, [email]);
}

async function create({ name, email, password }) {
    return await db.query('INSERT INTO users_pacients (name, email, password) VALUES ($1, $2, $3);', [name, email, password]);
}

export default {
    findEmail,
    create
}