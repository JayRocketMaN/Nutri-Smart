import logger from "../config/logger.js";
import { User, healthProfile } from "../models/index.js";
import emailService from "../Services/emailService.js";
import { recommendationService }  from "../Services/mealRecommendationService.js";


export const mealController = async (req, res) => {
   try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'userId is required' });
    }
    const userProfile = await healthProfile.findOne({ 
      where: { userId } ,
      include: [{
        model: User,
        attributes: ['name', 'email'],
      }]
    });

    if (!userProfile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    const profileData = userProfile.get({ plain: true });
    
    const jobs = await ensureEmbedding(profileData);

    // Send recommended meal to email
    await emailService.sendRecommendedMealEmail(
      userProfile?.User?.email || "example@gmail.com", // Pls put recipient email here
      'Your Meal Recommendations',
      userProfile?.User?.name || "User",
      JSON.stringify(Meal)
    );

    res.status(200).json(
      { 
        success: true, 
        message: "Meal recommendations fetched successfully, Check your email!",
        
    }
    );

  } catch (err) {
    logger.error('Error in /api/recommend:', err);
    res.status(500).json({ success: false, error: err.message });
  }
}