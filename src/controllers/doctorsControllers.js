import doctorsServices from "../services/doctorsServices.js";

async function nameDoctors(req, res, next){
    const { name } = req.params;

    try {
        const doctorsName = await doctorsServices.doctorsName({ name })
        return res.status(200).send(doctorsName)
        
    } catch (err) {
        next(err);
    } 
}

async function specialtyDoctors(req, res, next) {
    const { specialty } = req.params;
    
    try {

        const doctorsSpecialty = await doctorsServices.doctorsSpecialty({ specialty });
        return res.status(200).send(doctorsSpecialty)

    } catch (err) {
        next(err)
    }
}


async function locationDoctors(req, res, next) {
    const { idLocation } = req.params;

    try {

        const doctorsLocation = await doctorsServices.doctorsLocation({ idLocation });
        return res.status(200).send(doctorsLocation)
        
    } catch (err) {
        next(err)
    }
}

async function signup(req, res, next) {
    const { name, email, password, specialty, location } = req.body;
    try {
        await doctorsServices.create({ name, email, password, specialty, location });
        return res.sendStatus(201)
        
    } catch (err) {
        next(err)
    }
}

async function signin(req, res, next) {
    const { email, password } = req.body;

    try {
        const token = await doctorsServices.signin({ email, password });
        return res.status(200).send({ token });
        
    } catch (err) {
        next(err)
    }
}

async function myAppointments(req, res, next) {
    const { id } = res.locals.user;
    try {

        const myAppointments = await doctorsServices.myAppointments(id);
        return res.status(200).send(myAppointments)
        
    } catch (err) {
        next(err)
    }
}

async function cancelAppointment(req, res, next) {
    const { id_appointment } = req.params;
    const { id } = res.locals.user;

    try {

        const confirmation = await doctorsServices.cancelAppointment(id_appointment, id);
        return res.status(200).send('This appointment was canceled', confirmation)
        
    } catch (err) {
        next(err)
    }
}

async function confirmAppointment(req, res, next) {
    const { id_appointment } = req.params;
    const { id } = res.locals.user;

    try {

        const confirmation = await doctorsServices.confirmAppointment(id_appointment, id);
        return res.status(200).send('This appointment was confirmed', confirmation)
        
    } catch (err) {
        next(err)
    }
}

async function addAvailableTime(req, res, next) {
    const { date, time } = req.body;
    const { id } = res.locals.user;

    try {
        const confirmation = await doctorsServices.addAvailableTime(date, time, id);
        return res.status(201).send(confirmation);
        
    } catch (err) {
        next(err)
    }
}

export default {
    nameDoctors,
    specialtyDoctors,
    locationDoctors,
    signup,
    signin,
    myAppointments,
    cancelAppointment,
    confirmAppointment,
    addAvailableTime
}