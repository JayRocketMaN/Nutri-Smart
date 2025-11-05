// src/middleware/adminMiddleware.js

import AppError from "../utils/appError";
export const adminMiddleware = (req,res,next) => {
  if (!req.user) return next(new AppError("Unauthorized", 401));
  if (req.user.role !== "admin") return next(new AppError("Admin access required", 403));
  next();
};
