import { Router } from "express";
import { validateSchema } from '../middlewares/validateSchema.js';
import users from '../schemas/usersSchema.js';
import pacientsControllers from "../controllers/pacientsControllers.js";

const pacientsRoutes = Router();

pacientsRoutes.post('/pacient/signup', validateSchema(users.pacientSchemaSignUp), pacientsControllers.signup);
pacientsRoutes.post('/pacient/signin', validateSchema(users.pacientSchemaSignIn), pacientsControllers.signin);

export default pacientsRoutes;