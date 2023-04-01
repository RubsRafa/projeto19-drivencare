import { Router } from "express";
import doctorsControllers from "../controllers/doctorsControllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import users from "../schemas/usersSchema.js";

const doctorsRoutes = Router();

doctorsRoutes.get('/name/:name', doctorsControllers.nameDoctors);
doctorsRoutes.get('/specialty/:specialty', doctorsControllers.specialtyDoctors);
doctorsRoutes.get('/location/:idLocation', doctorsControllers.locationDoctors);
doctorsRoutes.post('/signup', validateSchema(users.doctorSchemaSignUp), doctorsControllers.signup);
doctorsRoutes.post('/signin', validateSchema(users.schemaSignIn), doctorsControllers.signin);

export default doctorsRoutes;