import db from '../config/db.js';

async function getDoctorByName(name) {
    return await db.query(`
    SELECT d.name, d.email, dspe.id_doctor, spe.specialty, l.hospital_name, l.state, l.city, l.street, l.number 
    FROM doctors_specialties dspe 
    LEFT JOIN doctors d 
      ON d.id = dspe.id_doctor 
    LEFT JOIN specialties spe 
      ON spe.id = dspe.id_specialty 
    LEFT JOIN locations l 
      ON l.id = d.id_location
    WHERE d.name = $1;
    `, [name]);
}

async function getDoctorBySpecialty(specialty) {
    return await db.query(`
    SELECT d.name, d.email, dspe.id_doctor, spe.specialty, l.hospital_name, l.state, l.city, l.street, l.number 
    FROM doctors_specialties dspe 
    LEFT JOIN doctors d 
      ON d.id = dspe.id_doctor 
    LEFT JOIN specialties spe 
      ON spe.id = dspe.id_specialty 
    LEFT JOIN locations l 
      ON l.id = d.id_location
    WHERE spe.specialty = $1;
    `, [specialty]);
}

async function getDoctorByLocation(idLocation) {
    return await db.query(`
    SELECT d.name, d.email, dspe.id_doctor, spe.specialty, l.hospital_name, l.state, l.city, l.street, l.number 
    FROM doctors_specialties dspe 
    LEFT JOIN doctors d 
      ON d.id = dspe.id_doctor 
    LEFT JOIN specialties spe 
      ON spe.id = dspe.id_specialty 
    LEFT JOIN locations l 
      ON l.id = d.id_location
    WHERE d.id_location = $1;
    `, [idLocation]);
}

export default {
    getDoctorByName,
    getDoctorBySpecialty,
    getDoctorByLocation
}