import { Router } from "express";
import { validateSchema } from '../middlewares/validateSchema.js';
import users from '../schemas/usersSchema.js';
import pacientsControllers from "../controllers/pacientsControllers.js";

const pacientsRoutes = Router();

pacientsRoutes.post('/pacient/signup', validateSchema(users.pacientSchema), pacientsControllers.signup)

export default pacientsRoutes;