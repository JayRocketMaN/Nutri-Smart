// src/controllers/profileController.js

import { profileService } from "../Services/profileService.js";

export const createOrUpdate = async (req,res,next) => {

  try { const p = await profileService.createOrUpdate(req.user.id, req.body); 
    res.json({ profile: p }); 
  } 
    catch (err) 
    { next(err); }

};

export const getProfile = async (req,res,next) => {
  try {
     const p = await profileService.get(req.user.id); 
    if (!p) 
      return res.status(404).json({ error: "Profile not found" }); 
    res.json({ profile: p }); 
  } 
  catch (err) 
  { next(err); }

};

export const deleteProfile = async (req,res,next) => {
  try {
     await profileService.delete(req.user.id); 
     res.json({ message: "Profile deleted" }); 
    } catch (err) 
    { next(err); }
    
};
