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

async function isMyAppointments(user) {
    return await db.query('SELECT * FROM schedules WHERE id_patient = $1;', [user.id])
}

async function scheduleAppointment(id_appointment, user) {
    return await db.query('INSERT INTO schedules (id_patient, id_appointment, id_status) VALUES ($1, $2, 1);', [user.id, id_appointment])
}

async function removeAppointment(id_appointment) {
    return await db.query('UPDATE appointments SET is_available = $1 WHERE id = $2;', [false, id_appointment]);
}

async function myScheduledyAppointments(id_appointment) {
    return await db.query(`
    SELECT a.date, a.time, d.name, d.email, dss.specialty, l.hospital_name 
    FROM locations l 
    JOIN doctors d 
      ON d.id_location = l.id 
    JOIN appointments a 
      ON d.id = a.id_doctor 
    JOIN (SELECT s.specialty, d.id AS id_doctor 
        FROM doctors_specialties ds 
        JOIN specialties s 
          ON s.id = ds.id_specialty 
        JOIN doctors d 
          ON d.id = ds.id_doctor) AS dss 
      ON dss.id_doctor = d.id 
    WHERE a.id = $1;
    `, [id_appointment]);
}

async function myAppointments(user) {
    return await db.query(`
    SELECT p.name AS patient, p.email AS patient_email, a.date, a.time, d.name AS doctor_name, d.email AS doctor_email, doctor_spe.specialty, l.hospital_name, l.state, l.city, l.street, l.number, s.status 
    FROM locations l 
    JOIN doctors d 
      ON d.id_location = l.id 
    JOIN appointments a 
      ON d.id = a.id_doctor 
    JOIN (SELECT sche.id_patient, sche.id_appointment, s.status 
        FROM status s 
        JOIN schedules sche 
          ON sche.id_status = s.id) AS s 
      ON s.id_appointment = a.id 
    JOIN patients p 
      ON p.id = s.id_patient 
    JOIN (SELECT s.specialty, d.id AS id_patient 
        FROM doctors_specialties ds 
        JOIN specialties s 
          ON s.id = ds.id_specialty 
        JOIN doctors d 
          ON d.id = ds.id_doctor) AS doctor_spe 
      ON doctor_spe.id_patient = s.id_patient
    WHERE s.id_patient = $1;
    `, [user.id]);
}

export default {
    findEmail,
    create,
    createSession,
    findSession,
    findUserById,
    isAppointmentAvailable,
    isMyAppointments,
    scheduleAppointment,
    removeAppointment,
    myAppointments,
    myScheduledyAppointments
}