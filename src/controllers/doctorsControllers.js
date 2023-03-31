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

export default {
    nameDoctors,
    specialtyDoctors,
    locationDoctors
}