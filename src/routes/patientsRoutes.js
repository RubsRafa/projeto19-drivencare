import { Router } from "express";
import { validateSchema } from '../middlewares/validateSchema.js';
import { validateToken } from '../middlewares/validateToken.js'
import users from '../schemas/usersSchema.js';
import patientsControllers from "../controllers/patientsControllers.js";

const patientsRoutes = Router();

patientsRoutes.post('/signup', validateSchema(users.patientSchemaSignUp), patientsControllers.signup);
patientsRoutes.post('/signin', validateSchema(users.schemaSignIn), patientsControllers.signin);
patientsRoutes.post('/schedule/:id_appointment', validateToken, patientsControllers.scheduleAppointment)
patientsRoutes.get('/myAppointments', validateToken, patientsControllers.allMyAppointments)

export default patientsRoutes;