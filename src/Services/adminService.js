// import User from "../models/User.js";
// import healthProfile from "../models/Profile.js"
import { User, healthProfile } from "../models/index.js";
import { Op } from "sequelize";
import logger from "../config/logger.js";
import fs from 'fs';
import AppError from "../Utils/AppError.js";

export const getAllUsersServices = async () => {
    try {
        const users = await User.findAll({ 
            where: { role: { [Op.ne]: "admin"} },
            attributes: { exclude: ['password', 'otp', 'otpTime']},
            include: [healthProfile]
        });

        if (!users) return null;

        return users;
    } catch (error) {
        logger.error(error.message);
        throw new AppError("Failed to fetch users", 500);
    };
};


export const getSingleUserService = async (userId) => {
    try {
        const user = await User.findOne({ 
            where: { id: userId, role: { [Op.ne]: "admin"} },
            attributes: { exclude: ['password', 'otp', 'otpTime']},
            include: [healthProfile]
        });

        if (!user) throw new AppError("User does not exist", 404);

        return user;
    } catch (error) {
        logger.error(`Error fetching user with ID ${userId}:`, error.message);
        
    };
};


export const deleteUserService = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) throw new AppError("User does not exist", 404);

        const healthProfile = await healthProfile.findOne({ where: { userId: user.id }});
        
        
        if (profile?.profileImageUrl) {
            fs.unlink(profile.profileImageUrl, (err) => {
                if (err) logger.warn(`Could not delete profile image: ${err.message}`);
            });
        };

        await healthProfile.destroy({ where: { userId: user.id }});
        await User.destroy({ where: { id: user.id }});

        return user;
    } catch (error) {
        logger.error(error.message);  
    };
};

export const getStatsService = async () => {
    try {
        // User stats
        const totalUsers = await User.count({
            where: { role: { [Op.ne]: "admin"} }
        });

        const verifiedUsers = await User.count({
            where: { 
                verified: true, 
                role: { [Op.ne]: "admin"} 
            },
        });

        const unverifiedUsers = await User.count({
            where: { 
                verified: false, 
                role: { [Op.ne]: "admin"}
            },
        });


        // Profile stats
        const baseInclude = {
            include: [
                {
                model: User,
                where: { role: { [Op.ne]: "admin" } },
                attributes: [],
                },
            ],
        };

        const totalProfiles = await healthProfile.count(baseInclude);

        const profilesWithImage = await healthProfile.count({
            where: { profileImageUrl: { [Op.not]: null } },
            ...baseInclude,
        });

        const profilesWithoutImage = await healthProfile.count({
            where: { profileImageUrl: null },
            ...baseInclude,
        });
        

         return {
                    success: true,
                    message: "Users statistics retrieved successfully",
                    stats: {
                        users: {
                            total: totalUsers,
                            verified: verifiedUsers,
                            unverified: unverifiedUsers,
                        },
                        profiles: {
                            total: totalProfiles,
                            withImage: profilesWithImage,
                            withoutImage: profilesWithoutImage,
                           
                        },
                    },
                };


    } catch (error) {
        logger.error("Error fetching admin stats:", error);
    };
};