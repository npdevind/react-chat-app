import express from "express";
import { protectRoute } from "../middleware/protectRoutes.js";
import * as userController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, userController.getAllUserForSidebar);

export default router;
