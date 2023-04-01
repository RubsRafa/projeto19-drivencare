import bcrypt from 'bcrypt';
import errors from '../errors/index.js';
import patientsRepositories from '../repositories/patientsRepositories.js'
import jwt from 'jsonwebtoken';
import "dotenv/config";

async function create({ name, email, password }) {
    const { rowCount } = await patientsRepositories.findEmail(email);
    if (rowCount) throw errors.duplicatedEmailError('User already exists')

    const passwordHashed = bcrypt.hashSync(password, 10);
    await patientsRepositories.create({ name, email, password: passwordHashed});
}

async function signin({ email, password }){
    const { rowCount, rows: [patient] } = await patientsRepositories.findEmail(email);
    if (!rowCount) throw errors.notFoundError('Incorrect email or password');
    
    const validPassword = await bcrypt.compare(password, patient.password);
    if(!validPassword) throw errors.notFoundError('Incorrect email or password');

    const token = jwt.sign({ id_patient: patient.id }, process.env.SECRET_KEY_JWT)

    return token;
}

async function scheduleAppointment(id_appointment, user) {
    const { rowCount, rows: [appointment] } = await patientsRepositories.isAppointmentAvailable(id_appointment);
    
    if (!rowCount) throw errors.notFoundError('This appointment was not found');

    const { rows: isMyAppointment } = await patientsRepositories.isMyAppointments(user);
    if(isMyAppointment[0] && isMyAppointment.id_appointment === id_appointment) throw errors.conflictError('You`ve already schedule this appointment');
    if (!appointment.is_available) throw errors.conflictError('This appointment is not available anymore');
    
    await patientsRepositories.scheduleAppointment(id_appointment, user)
    await patientsRepositories.removeAppointment(id_appointment)
   
    const { rows: [myScheduledyAppointments] } = await patientsRepositories.myScheduledyAppointments(id_appointment);
    
    return myScheduledyAppointments;
}


async function getMyAppointments(user) {
    const { rows: AllMyAppointments } = await patientsRepositories.myAppointments(user)

    return AllMyAppointments;
}

async function viewAppointmentsHistory(id) {
    const { rows: appointment } = await patientsRepositories.viewAppointmentsHistory(id);
    return appointment;
}

export default {
    create,
    signin,
    scheduleAppointment,
    getMyAppointments,
    viewAppointmentsHistory
}