import express from "express";
const router = express.Router();
import * as messageController from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/protectRoutes.js";

router.get("/:id", protectRoute, messageController.getMessage);

router.post("/send/:id", protectRoute, messageController.sendMessage);

export default router;
