import db from '../config/db.js';

async function getDoctorByName(name) {
  return await db.query(`
    SELECT d.name, d.email, dspe.id_doctor, spe.specialty, l.hospital_name, l.state, l.city, l.street, l.number, JSON_agg(json_build_object('id', da.id, 'date', da.date, 'time', da.time)) AS available_time 
    FROM doctors_specialties dspe 
    LEFT JOIN doctors d 
      ON d.id = dspe.id_doctor 
    LEFT JOIN specialties spe 
      ON spe.id = dspe.id_specialty 
    LEFT JOIN locations l 
      ON l.id = d.id_location 
    LEFT JOIN (SELECT a.id, a.date, a.time, a.id_doctor 
      FROM appointments a 
      WHERE a.is_available = true) AS da 
        ON da.id_doctor = d.id 
    WHERE d.name = $1
    GROUP BY d.name, d.email, dspe.id_doctor, spe.specialty, l.hospital_name, l.state, l.city, l.street, l.number;
    `, [name]);
}

async function getDoctorBySpecialty(specialty) {
  return await db.query(`
    SELECT d.name, d.email, dspe.id_doctor, spe.specialty, l.hospital_name, l.state, l.city, l.street, l.number, JSON_agg(json_build_object('id', da.id, 'date', da.date, 'time', da.time)) AS available_time 
    FROM doctors_specialties dspe 
    LEFT JOIN doctors d 
      ON d.id = dspe.id_doctor 
    LEFT JOIN specialties spe 
      ON spe.id = dspe.id_specialty 
    LEFT JOIN locations l 
      ON l.id = d.id_location 
    LEFT JOIN (SELECT a.id, a.date, a.time, a.id_doctor 
      FROM appointments a
      WHERE a.is_available = true) AS da 
        ON da.id_doctor = d.id 
    WHERE spe.specialty = $1
    GROUP BY d.name, d.email, dspe.id_doctor, spe.specialty, l.hospital_name, l.state, l.city, l.street, l.number;
    `, [specialty]);
}

async function getDoctorByLocation(idLocation) {
  return await db.query(`
    SELECT d.name, d.email, dspe.id_doctor, spe.specialty, l.hospital_name, l.state, l.city, l.street, l.number, JSON_agg(json_build_object('id', da.id, 'date', da.date, 'time', da.time)) AS available_time 
    FROM doctors_specialties dspe 
    LEFT JOIN doctors d 
      ON d.id = dspe.id_doctor 
    LEFT JOIN specialties spe 
      ON spe.id = dspe.id_specialty 
    LEFT JOIN locations l 
      ON l.id = d.id_location 
    LEFT JOIN (SELECT a.id, a.date, a.time, a.id_doctor 
      FROM appointments a
      WHERE a.is_available = true) AS da 
        ON da.id_doctor = d.id 
    WHERE d.id_location = $1
    GROUP BY d.name, d.email, dspe.id_doctor, spe.specialty, l.hospital_name, l.state, l.city, l.street, l.number;
    `, [idLocation]);
}

async function findEmail(email) {
  return await db.query('SELECT * FROM doctors WHERE email = $1;', [email]);
}

async function create({ name, email, password, location }) {
  return await db.query('INSERT INTO doctors (name, email, password, id_location) VALUES ($1, $2, $3, $4);', [name, email, password, location])
}

async function addSpecialty(doctor,{ specialty }) {
  return await db.query('INSERT INTO doctors_specialties (id_specialty, id_doctor) VALUES ($1, $2);', [specialty, doctor.id]);
}

async function findUserById({ id }) {
  return await db.query('SELECT * FROM doctors WHERE id = $1;', [id])
}

async function allMyAppointments(id) {
  return await db.query(`
  SELECT a.id AS id_appointment, a.date, a.time, p.name AS patient_name, ds.specialty 
  FROM schedules s 
  JOIN appointments a 
    ON a.id = s.id_appointment 
  JOIN patients p 
    ON p.id = s.id_patient 
  JOIN (SELECT s.specialty, d.id 
    FROM doctors_specialties ds 
    JOIN specialties s 
      ON s.id = ds.id_specialty 
    JOIN doctors d 
      ON d.id = ds.id_doctor) AS ds 
    ON ds.id = a.id_doctor 
  JOIN doctors d 
    ON a.id_doctor = d.id 
  WHERE d.id = $1;`, [id]);
}

async function isMyAppointment(id_appointment) {
  return await db.query(`
  SELECT * FROM appointments WHERE id = $1 AND is_available = $2;
  `, [id_appointment, false]);
}

async function cancelAppointment(id_appointment) {
  return await db.query(`UPDATE schedules SET id_status = $1 WHERE id_appointment = $2;`, [4, id_appointment]);
}

async function confirmAppointment(id_appointment) {
  return await db.query(`UPDATE schedules SET id_status = $1 WHERE id_appointment = $2;`, [2, id_appointment]);
}

async function confirmation(id_appointment) {
  return await db.query(`
  SELECT a.id AS id_appointment, a.date, a.time, p.name, s.status 
  FROM schedules sc 
  JOIN appointments a 
    ON a.id = sc.id_appointment 
  JOIN patients p 
    ON p.id = sc.id_patient 
  JOIN status s 
    ON s.id = sc.id_status 
  WHERE a.id = $1; 
  `, [id_appointment]);
}

async function alreadyAvailable(id) {
  return await db.query(`SELECT * FROM appointments WHERE id_doctor = $1;`, [id]);
}

async function addAvailableTime(date, time, id) {
  return await db.query('INSERT INTO appointments (id_doctor, date, time, is_available) VALUES ($1, $2, $3, $4);', [id, date, time, true])
}

async function viewAllAvailableTime(id) {
  return await db.query(`
  SELECT a.id AS id_appointment, a.date, a.time
  FROM appointments a 
  WHERE a.id_doctor = $1 AND a.is_available = $2; 
  `, [id, true])
}

async function viewAppointmentsHistory(id) {
  return await db.query(`
  SELECT p.name AS patient, a.date, a.time, d.name AS doctor_name, doctor_spe.specialty, l.hospital_name, s.status 
  FROM locations l 
  JOIN doctors d 
    ON d.id_location = l.id 
  JOIN appointments a 
    ON d.id = a.id_doctor 
  JOIN (SELECT sche.id_patient, sche.id_appointment, s.status 
    FROM status s 
    JOIN schedules sche 
      ON sche.id_status = s.id 
    WHERE s.id = $1) AS s 
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
  WHERE d.id = $2;
  `, [3, id]);
}

async function concludedAppointment(id_appointment) {
  return await db.query('UPDATE schedules SET id_status = $1 WHERE id_appointment = $2;', [3, id_appointment])
}

export default {
  getDoctorByName,
  getDoctorBySpecialty,
  getDoctorByLocation,
  findEmail,
  create,
  addSpecialty,
  findUserById,
  allMyAppointments,
  isMyAppointment,
  confirmation,
  cancelAppointment,
  confirmAppointment,
  alreadyAvailable,
  addAvailableTime,
  viewAllAvailableTime,
  viewAppointmentsHistory,
  concludedAppointment
}