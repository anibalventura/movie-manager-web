import express from "express";
import * as adminController from "../controllers/admin.controller.js";

const adminRoutes = express.Router();

adminRoutes.get("/admin", adminController.getIndex);

adminRoutes.get("/admin/add-movie", adminController.getAddMovie);
adminRoutes.post("/admin/add-movie", adminController.postAddMovie);

adminRoutes.get("/admin/edit-movie/:movieId", adminController.getEditMovie);
adminRoutes.post("/admin/edit-movie", adminController.postEditMovie);

adminRoutes.get("/admin/delete-movie/:movieId", adminController.getDeleteMovie);
adminRoutes.post("/admin/delete-movie", adminController.postDeleteMovie);

export default adminRoutes;
