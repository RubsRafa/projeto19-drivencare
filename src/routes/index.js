import { Router } from "express";
import patientsRoutes from "./patientsRoutes.js";

const routes = Router();

routes.use('/patient', patientsRoutes);

export default routes;