import express from 'express';
import {
  getProfile,
  createOrUpdateProfile
} from '../controllers/healthController.js';
import { authenticate } from '../utils/Auth.js';

const router = express.Router();

router.get('/', authenticate, getProfile);
router.post('/', authenticate, createOrUpdateProfile);

export default router;