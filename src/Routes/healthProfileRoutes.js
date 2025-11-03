import express from "express";
import {
  createProfile,
  getProfile,
  updateProfile,
  deleteAccount,
} from "../controllers/profileControllers.js";
import upload from "../Middleware/multerSetup.js";

const router = express.Router();

// Routes
router.post("/create", 
  upload.fields([
    { name: "profileImage", maxCount: 1 },
  ]), 
  createProfile
);

router.get("/", getProfile);

router.post("/update", 
  upload.fields([
    { name: "profileImage", maxCount: 1 },
  ]), 
  updateProfile
);

router.delete("/delete", deleteAccount);


export default router;

