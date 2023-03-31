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

export default {
    nameDoctors,
    specialtyDoctors
}