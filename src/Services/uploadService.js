import logger from "../config/logger.js";
import { healthProfile } from "../models/index.js";
import path from "path";
import fs from "fs";


const deleteOldFile = (filePath) => {
    if (!filePath) return;
    const localPath = path.resolve(filePath);

    fs.unlink(localPath, (err) => {
        if (err) logger.warn(`Failed to delete old file: ${filePath}`);
        else logger.info(`Deleted old file: ${filePath}`);
    });
};


export const uploadProfileImage = async (userId, imageUrl) => {
    try {
        const profile = await healthProfile.findOne({ where: { userId }});
        if (!profile) throw new AppError("Profile not found", 404);

        if (profile.profileImageUrl) deleteOldFile(profile.profileImageUrl);

        profile.profileImageUrl = imageUrl;
        await profile.save();

        logger.info(`Profile image updated for user ${userId}`);
        return profile;

    } catch (error) {
        logger.error(`Profile Image Upload Failed: ${error.message}`);
        return null;
    };
};
