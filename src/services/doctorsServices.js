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

async function signin({ email, password }) {
    const { rowCount, rows: [doctor] } = await doctorsRepositories.findEmail(email);
    if (!rowCount) throw errors.notFoundError('Incorrect email or password');

    const validPassword = await bcrypt.compare(password, doctor.password);
    if(!validPassword) throw errors.notFoundError('Incorrect email or password');

    const token = uuidV4();
    await doctorsRepositories.createSession({ token, id: doctor.id });

    return token;
}

async function myAppointments(id) {
    const { rows: allMyAppointments } = await doctorsRepositories.allMyAppointments(id);
    
    return allMyAppointments
}

async function cancelAppointment(id_appointment, id) {
    const { rowCount, rows: [appointment] } = await doctorsRepositories.isMyAppointment(id_appointment);
    if(!rowCount) throw errors.notFoundError('This appointment was not found');
    if(appointment.id_doctor !== id) throw errors.conflictError("This appointment is not yours to cancel");

    await doctorsRepositories.cancelAppointment(id_appointment);
    const confirmation = await doctorsRepositories.confirmation(id_appointment);

    return confirmation;
}

async function confirmAppointment(id_appointment, id) {
    const { rowCount, rows: [appointment] } = await doctorsRepositories.isMyAppointment(id_appointment);
    if(!rowCount) throw errors.notFoundError('This appointment was not found');
    if(appointment.id_doctor !== id) throw errors.conflictError("This appointment is not yours to confirm");

    await doctorsRepositories.confirmAppointment(id_appointment);
    const confirmation = await doctorsRepositories.confirmation(id_appointment);

    return confirmation;
}

async function addAvailableTime(date, time, id) {
    const { rows: available } = await doctorsRepositories.alreadyAvailable(id);
    const availableAppointmentAlreadyOpen = available.find((a) => {
        if (a.date === date && a.time === time) {
            return a;
        }
    })
    if(availableAppointmentAlreadyOpen) throw errors.conflictError('You´ve already opened this appointment');
    await doctorsRepositories.addAvailableTime(date, time, id);
    
    const confirmation = await doctorsRepositories.viewAllAvailableTime(id);
    return confirmation; 
}


export default {
    doctorsName,
    doctorsSpecialty,
    doctorsLocation,
    create,
    signin,
    myAppointments,
    cancelAppointment,
    confirmAppointment,
    addAvailableTime
}