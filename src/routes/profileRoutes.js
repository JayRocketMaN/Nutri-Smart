// src/routes/profileRoutes.js

import express from "express";
import * as ctrl from "../Controllers/profileControllers.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";
const router = express.Router();

router.post("/create", authMiddleware, ctrl.createOrUpdate);
router.get("/", authMiddleware, ctrl.getProfile);
router.delete("/", authMiddleware, ctrl.deleteProfile);

export default router;