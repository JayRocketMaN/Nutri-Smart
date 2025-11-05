import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile
} from '../controllers/userController.js';
import { validateUser } from '../utils/Validator.js';
import { authenticate } from '../utils/Auth.js';

const router = express.Router();

router.post('/register', validateUser, register);
router.post('/login', login);
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);

export default router;