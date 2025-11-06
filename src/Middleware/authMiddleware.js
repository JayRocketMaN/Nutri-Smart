// src/middleware/authMiddleware.js

import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { APP_CONFIG } from "../config/config.js";
import AppError from "../utils/AppError.js";

export const authMiddleware = async (req,res,next) => {
  try {
    const header = req.headers.authorization || req.cookies?.token || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : req.cookies?.token;
    if (!token) return next(new AppError("Unauthorized", 401));
    const payload = jwt.verify(token, APP_CONFIG.JWT_SECRET);

    const user = await User.findByPk(payload.id, { 
      attributes: ["id","email","name","role"] 
    });
    if (!user) return next(new AppError("User not found", 401));
    
    req.user = { id: user.id, email: user.email, name: user.name, role: user.role };
    next();
  } 
  catch (err) { next(new AppError("Invalid token", 401)); }

};
