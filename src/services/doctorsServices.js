import errors from "../errors/index.js";
import doctorsRepositories from "../repositories/doctorsRepositories.js"
import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';


async function doctorsName({ name }) {
    const { rowCount, rows: doctor} = await doctorsRepositories.getDoctorByName(name);
    if (!rowCount) throw errors.notFoundError('This doctor was not found');

    return doctor;
}


async function doctorsSpecialty({ specialty }) {
    const { rowCount, rows: doctor } = await doctorsRepositories.getDoctorBySpecialty(specialty);
    if (!rowCount) throw errors.notFoundError('No doctor found with this specialty');

    return doctor;
}

async function doctorsLocation({ idLocation }) {
    const { rowCount, rows: doctor } = await doctorsRepositories.getDoctorByLocation(idLocation);
    if(!rowCount) throw errors.notFoundError('No doctor found in this location')

    return doctor;
}

async function create({ name, email, password, specialty, location }) {
    const { rowCount } = await doctorsRepositories.findEmail(email);
    if(rowCount) throw errors.duplicatedEmailError('User already exists');

    const passwordHashed = bcrypt.hashSync(password, 10);
    await doctorsRepositories.create({ name, email, password: passwordHashed, location });

    const { rows: [doctor] } = await doctorsRepositories.findEmail(email);
    await doctorsRepositories.addSpecialty(doctor, { specialty})

}


export default {
    doctorsName,
    doctorsSpecialty,
    doctorsLocation,
    create
}