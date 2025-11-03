// import express from 'express';
// import { mealController } from '../Controllers/mealControllers';


// const router = express.Router();

// router.get('/', mealController);

// export default router;



// src/routes/meal.routes.js
import express from "express";
import  { mealController } from "../Controllers/mealControllers.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";
const router = express.Router();

router.get("/recommendations", mealController);

export default router;
