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

async function findSession(token) {
    return await db.query('SELECT * FROM sessions_patients WHERE token = $1;', [token])
}

async function findUserById({ id }) {
    return await db.query('SELECT * FROM patients WHERE id = $1;', [id])
}

async function isAppointmentAvailable(id_appointment) {
    return await db.query('SELECT * FROM appointments WHERE id = $1;', [id_appointment])
}

async function myAppointments(user) {
    return await db.query('SELECT * FROM schedules WHERE id_patient = $1;', [user.id])
}

export default {
    findEmail,
    create,
    createSession,
    findSession,
    findUserById,
    isAppointmentAvailable,
    myAppointments
}