// src/controllers/authController.js
import { authService } from "../Services/authService.js";
import AppError from "../Utils/AppError.js";


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

// Resend otp
export const resendOtp = async (req, res) => {
  const id = req.user.id;
  const otp = getOtp();
  const otpTimeMins = APP_CONFIG.OTP_EXPIRY_TIME_MINS;
  const otpTime = getOtpExpiryTime(otpTimeMins);

  const user = await resendOtpService(id, otp, otpTime);
  if (!user) return res.status(401).send("You are not registered yet! Go to the sign up page!");

  // Send otp email
  try {
    await emailService.sendOtp(user.email, "Your OTP Verification Code", user.name, otp, otpTimeMins);
  } catch (error) {
    logger.error(error.message);
    throw new AppError(error.nessage, 500);
  };

   res.status(201).json({ message: "OTP sent to your email" });
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


export const forgotPassword = async (req,res,next) => { 
  try { await authService.forgotPassword(req.body); 
    res.json({ message: "OTP sent" }); 
  } 
  catch (err) 
  { next(err); 

  } };


export const resetPassword = async (req,res,next) => { 
  try { await authService.resetPassword(req.body); 
    res.json({ message: "Reset successful" }); 
  } 
  catch (err) 
  { next(err); 

  } };

// export const changePassword = async (req,res,next) => {
//   try { await authService.changePassword({
//      userId: req.user.id, 
//      oldPassword: req.body.oldPassword, 
//      newPassword: req.body.newPassword 
//     }); 
//      res.json({ message: "Password changed" }); 
//     } 
//     catch (err) 
//     { next(err); }
// };

export const changePassword = async (req,res,next) => {
  try { 
    if (!req.user) throw new AppError("Unauthorized", 401);
    const { oldPassword, newPassword } = req.body;
    await authService.changePassword({
       userId: req.user.id, 
       oldPassword, 
       newPassword 
    }); 
     res.json({ message: "Password changed" }); 
    } 
    catch (err) 
    { next(err); }
};
