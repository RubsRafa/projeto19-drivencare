import db from '../config/db.js';

async function findEmail(email){
    return await db.query(`SELECT * FROM patients WHERE email = $1;`, [email]);
}

async function create({ name, email, password }) {
    return await db.query('INSERT INTO patients (name, email, password) VALUES ($1, $2, $3);', [name, email, password]);
}

async function createSession({ token, id_patient}) {
    return await db.query('INSERT INTO sessions_patients (id_patient, token) VALUES ($1, $2);', [id_patient, token])
}

export default {
    findEmail,
    create,
    createSession
}