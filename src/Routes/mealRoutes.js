import express from 'express';
import { mealController } from '../Controllers/mealControllers';


const router = express.Router();

router.get('/', mealController);

export default router;
