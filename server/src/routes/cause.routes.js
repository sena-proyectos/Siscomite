import { Router } from "express";
import { getCause } from "../controller/cause.controller.js";

const causeRoutes = Router();

causeRoutes.get('/causes', getCause);
causeRoutes.post('/createCause');

export default causeRoutes 
