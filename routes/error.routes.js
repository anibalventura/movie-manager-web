import express from "express";
import { get404 } from "../controllers/error.controller.js";

const errorRoutes = express.Router();

errorRoutes.get("/", get404);

export default errorRoutes;
