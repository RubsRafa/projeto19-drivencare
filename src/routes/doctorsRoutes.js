import { Router } from "express";
import doctorsControllers from "../controllers/doctorsControllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateTokenDoctor } from '../middlewares/validateToken.js'
import users from "../schemas/usersSchema.js";

const doctorsRoutes = Router();

doctorsRoutes.get('/name/:name', doctorsControllers.nameDoctors);
doctorsRoutes.get('/specialty/:specialty', doctorsControllers.specialtyDoctors);
doctorsRoutes.get('/location/:idLocation', doctorsControllers.locationDoctors);
doctorsRoutes.post('/signup', validateSchema(users.doctorSchemaSignUp), doctorsControllers.signup);
doctorsRoutes.post('/signin', validateSchema(users.schemaSignIn), doctorsControllers.signin);
doctorsRoutes.get('/myAppointments', validateTokenDoctor, doctorsControllers.myAppointments);
doctorsRoutes.put('/cancel/:id_appointment', validateTokenDoctor, doctorsControllers.cancelAppointment);
doctorsRoutes.put('/confirm/:id_appointment', validateTokenDoctor, doctorsControllers.confirmAppointment);
doctorsRoutes.post('/available/time', validateSchema(users.doctorAvailableTime), validateTokenDoctor, doctorsControllers.addAvailableTime)

export default doctorsRoutes;