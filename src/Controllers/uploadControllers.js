import logger from "../config/logger.js";
import { uploadProfileImage } from "../Services/uploadService.js";



export const profileImageUploader = async (req, res) => {
  try {
    const userId = req.user.id; 
    if (!req.file) {
        return res.status(400).json({ message: "No image file uploaded" });
    };

    const profileImageUrl = `${req.protocol}://${req.get('host')}/${req.file?.path?.replace(/\\/g, '/')}`;

    const updatedProfile = await uploadProfileImage(userId, profileImageUrl);
    if (!updatedProfile) {
        res.status(404).json({ message: "Profile not found" });
    };

    res.status(201).json({ message: "ProfileImage uploaded successfully", profileImageUrl });
  } catch (error) {
    res.status(500).json({ message: "Error uploading profileImage", error: error.message });
  };
};