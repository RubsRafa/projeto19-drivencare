import { Router } from "express";
import pacientsRoutes from "./pacientsRoutes.js";

const routes = Router();

routes.use('/', pacientsRoutes);

export default routes;