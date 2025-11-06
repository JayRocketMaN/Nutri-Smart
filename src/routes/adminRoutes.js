// src/routes/adminRoutes.js

import express from "express";
import * as ctrl from "../Controllers/adminController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import { adminMiddleware } from "../Middleware/adminMiddleware.js";
const router = express.Router();

router.post("/meals", authMiddleware, adminMiddleware, ctrl.createMeal);
router.put("/meals/:id", authMiddleware, adminMiddleware, ctrl.updateMeal);
router.delete("/meals/:id", authMiddleware, adminMiddleware, ctrl.deleteMeal);
router.get("/meals", authMiddleware, adminMiddleware, ctrl.listMealsApi);

export default router;