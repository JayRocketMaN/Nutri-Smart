// src/routes/mealRoutes.js

import express from "express";
import * as ctrl from "../Controllers/mealControllers.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";
const router = express.Router();

router.get("/recommendations", authMiddleware, ctrl.getRecommendations);

export default router;