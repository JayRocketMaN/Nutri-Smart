// src/routes/adminEjsRoutes.js

import express from "express";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import { adminMiddleware } from "../Middleware/adminMiddleware.js";
import { 
  listMealsEjs, 
  createMeal, 
  updateMeal, 
  deleteMeal 
} from "../Controllers/adminController.js";
import Meal from "../models/meal.js";
const router = express.Router();

router.get("/dashboard", authMiddleware, adminMiddleware, listMealsEjs);

router.get("/meals/new", authMiddleware, adminMiddleware, 
  (req,res) => res.render("admin/meals"));
router.post("/meals/new", authMiddleware, adminMiddleware, 
  async (req,res) => { await createMeal(req,res); res.redirect("/dashboard"); });

router.get("/meals/edit/:id", authMiddleware, adminMiddleware, 
  async (req,res) => {
  const meal = await Meal.findByPk(req.params.id);
  res.render("admin/editMeal",{ meal });
});
router.post("/meals/edit/:id", authMiddleware, adminMiddleware, 
  async (req,res) => { await updateMeal(req,res); res.redirect("/dashboard"); });

router.post("/meals/delete/:id", authMiddleware, adminMiddleware, 
  async (req,res) => { await deleteMeal(req,res); res.redirect("/dashboard"); });

export default router;
