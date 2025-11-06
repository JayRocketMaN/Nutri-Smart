/// src/routes/authRoutes.js

import express from "express";
import * as ctrl from "../Controllers/authControllers.js";
const router = express.Router();

router.post("/register", ctrl.register);
router.post("/verify-otp", ctrl.verifyOtp);
router.post("/login", ctrl.login);
router.post("/logout", ctrl.logout);
router.post("/forgot", ctrl.forgot);
router.post("/reset", ctrl.reset);
router.post("/change-password", ctrl.changePassword);

export default router;