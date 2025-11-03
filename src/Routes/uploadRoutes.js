import express from 'express';
import upload from '../Middleware/multerSetup.js';
import { profileImageUploader } from '../Controllers/uploadControllers.js';

const router = express.Router();

router.post("/profile-image", upload.single("profileImage"), profileImageUploader);


export default router;   