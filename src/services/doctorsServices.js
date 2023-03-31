import errors from "../errors/index.js";
import doctorsRepositories from "../repositories/doctorsRepositories.js"

async function doctorsName({ name }) {
    const { rowCount, rows: [doctor]} = await doctorsRepositories.getDoctorByName(name);
    if (!rowCount) throw errors.notFoundError('This doctor was not found');

    return doctor;
}


async function doctorsSpecialty({ specialty }) {
    const { rowCount, rows: [doctor] } = await doctorsRepositories.getDoctorBySpecialty(specialty);
    if (!rowCount) throw errors.notFoundError('No doctor found with this specialty');

    return doctor;
}


export default {
    doctorsName,
    doctorsSpecialty
}