import { Router } from "express";
import { validateSchema } from '../middlewares/validateSchema.js';
import users from '../schemas/usersSchema.js';
import patientsControllers from "../controllers/patientsControllers.js";

const patientsRoutes = Router();

patientsRoutes.post('/signup', validateSchema(users.patientSchemaSignUp), patientsControllers.signup);
patientsRoutes.post('/signin', validateSchema(users.patientSchemaSignIn), patientsControllers.signin);

export default patientsRoutes;