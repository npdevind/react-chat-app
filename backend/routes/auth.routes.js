import express from "express";

const router = express.Router();

import * as authController from "../controllers/auth.controller.js";

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

export default router;
