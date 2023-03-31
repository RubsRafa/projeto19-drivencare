import { Router } from "express";
import doctorsControllers from "../controllers/doctorsControllers.js";

const doctorsRoutes = Router();

doctorsRoutes.get('/name/:name', doctorsControllers.nameDoctors);

export default doctorsRoutes;