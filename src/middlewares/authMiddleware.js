// src/controllers/authController.js
import { authService } from "../services/authService.js";
import AppError from "../utils/AppError.js";

export const register = async (req,res,next) => {
  try {
    const out = await authService.register(req.body);
    res.status(201).json(out);

  } catch (err) 

  { next(new AppError(err.message || "Register failed", 400)); 

  }
};


export const verifyOtp = async (req,res,next) => {
  try { 
    await authService.verifyOtp(req.body); 
    res.json({ message: "Verified" }); 
  } 
  catch (err) 
  { next(err); }

};


export const login = async (req,res,next) => {
  try { 
    const out = await authService.login(req.body); 
    res.json(out); 
  } catch (err) 
  { next(err); 

  }

};


export const logout = async (req,res,next) => {
   try { 
    await authService.logout(); 
    res.json({ message: "Logged out" }); 
  } 
  catch (err) 
  { next(err); 

  } };


export const forgot = async (req,res,next) => { 
  try { await authService.forgotPassword(req.body); 
    res.json({ message: "OTP sent" }); 
  } 
  catch (err) 
  { next(err); 

  } };


export const reset = async (req,res,next) => { 
  try { await authService.resetPassword(req.body); 
    res.json({ message: "Reset successful" }); 
  } 
  catch (err) 
  { next(err); 

  } };

export const changePassword = async (req,res,next) => {
  try { await authService.changePassword({
     userId: req.user.id, 
     oldPassword: req.body.oldPassword, 
     newPassword: req.body.newPassword 
    }); 
     res.json({ message: "Password changed" }); 
    } 
    catch (err) 
    { next(err); }
};