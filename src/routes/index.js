import { Router } from "express";
import pacientsRoutes from "./pacientsRoutes.js";

const routes = Router();

routes.use('/pacient', pacientsRoutes);

export default routes;