// src/controllers/adminController.js
import { adminService } from "../Services/adminService.js";

export const createMeal = async (req,res,next) => { try { const meal = await adminService.createMeal(req.body); res.status(201).json(meal); } catch (err) { next(err); } };

export const updateMeal = async (req,res,next) => { try { const meal = await adminService.updateMeal(req.params.id, req.body); res.json(meal); } catch (err) { next(err); } };

export const deleteMeal = async (req,res,next) => { try { await adminService.deleteMeal(req.params.id); res.json({ message: "Deleted" }); } catch (err) { next(err); } };

export const listMealsApi = async (req,res,next) => { try { const meals = await adminService.listMeals(); res.json({ meals }); } catch (err) { next(err); } };

export const listMealsEjs = async (req,res,next) => { try { const meals = await adminService.listMeals(); res.render("admin/dashboard", { meals, user: req.user }); } catch (err) { next(err); } };
