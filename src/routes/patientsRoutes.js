import { Router } from "express";
import { validateSchema } from '../middlewares/validateSchema.js';
import { validateTokenPatient } from '../middlewares/validateToken.js'
import users from '../schemas/usersSchema.js';
import patientsControllers from "../controllers/patientsControllers.js";

const patientsRoutes = Router();

patientsRoutes.post('/signup', validateSchema(users.patientSchemaSignUp), patientsControllers.signup);
patientsRoutes.post('/signin', validateSchema(users.schemaSignIn), patientsControllers.signin);
patientsRoutes.post('/schedule/:id_appointment', validateTokenPatient, patientsControllers.scheduleAppointment)
patientsRoutes.get('/myAppointments', validateTokenPatient, patientsControllers.allMyAppointments)
patientsRoutes.get('/appointments/history', validateTokenPatient, patientsControllers.viewAppointmentsHistory);

export default patientsRoutes;