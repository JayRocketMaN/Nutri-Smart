import express from 'express';
import {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan
} from '../controllers/mealPlanController.js';
import { authenticate } from '../utils/Auth.js';

const router = express.Router();

router.get('/', authenticate, getPlans);
router.post('/', authenticate, createPlan);
router.put('/:id', authenticate, updatePlan);
router.delete('/:id', authenticate, deletePlan);

export default router;