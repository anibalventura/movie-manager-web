import express from "express";
import * as movieController from "../controllers/movie.controller.js";

const movieRoutes = express.Router();

movieRoutes.get("/", movieController.getIndex);
movieRoutes.get("/movie/:genre", movieController.getByGenre);

export default movieRoutes;
