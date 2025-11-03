import { User, healthProfile } from "../models/index.js";
import AppError from "../Utils/AppError.js";


export const createProfileService = async (userId, data) => {
  const existing = await healthProfile.findOne({ where: { userId } });
  if (existing) throw new AppError("Profile already exists.");

  const profile = await healthProfile.create({ ...data, userId });
  return profile;
};

export const getProfileService = async (userId) => {
  const userProfile = await User.findOne({ 
    where: { id: userId },
    attributes: { exclude: ["password", "otp", "otpTime"] },
    include: [
      {
        model: healthProfile,
        required: false,
      }
    ]
  });
  if (!userProfile) throw new AppError("Profile not found.");
  return userProfile;
};

export const updateProfileService = async (userId, data) => {
  const profile = await healthProfile.findOne({ where: { userId } });
  
  if (!healthProfile) throw new AppError("Profile not found.");
  
  Object.keys(data).forEach((key) => {
    if (data[key] !== undefined) {
      profile[key] = data[key];
    };
  });

  await profile.save();
  
  return healthProfile;
};

export const deleteAccountService = async (userId) => {
  await healthProfile.destroy({ where: { userId } });
  await User.destroy({ where: { id: userId } });
  return true;
};
