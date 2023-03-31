import { Router } from "express";
import doctorsControllers from "../controllers/doctorsControllers.js";

const doctorsRoutes = Router();

doctorsRoutes.get('/name/:name', doctorsControllers.nameDoctors);
doctorsRoutes.get('/specialty/:specialty', doctorsControllers.specialtyDoctors)

export default doctorsRoutes;