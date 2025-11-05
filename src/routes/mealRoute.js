import express from 'express';
import {
  getAllMeals,
  getMealById,
  createMeal,
  updateMeal,
  deleteMeal
} from '../controllers/mealController.js';
import { authenticate } from '../utils/Auth.js';

const router = express.Router();

router.get('/', getAllMeals);
router.get('/:id', getMealById);
router.post('/', authenticate, createMeal);
router.put('/:id', authenticate, updateMeal);
router.delete('/:id', authenticate, deleteMeal);

export default router;