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
      FROM appointments a) AS da 
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
      FROM appointments a) AS da 
        ON da.id_doctor = d.id 
    WHERE d.id_location = $1
    GROUP BY d.name, d.email, dspe.id_doctor, spe.specialty, l.hospital_name, l.state, l.city, l.street, l.number;
    `, [idLocation]);
}

export default {
  getDoctorByName,
  getDoctorBySpecialty,
  getDoctorByLocation
}