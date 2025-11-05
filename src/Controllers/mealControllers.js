// src/controllers/mealController.js
import { recommendationService } from "../Services/mealRecommendationService.js";

export const getRecommendations = async (req,res,next) => {
  try {
    const recs = await recommendationService.getForUser(req.user.id);
    if (req.accepts("html")) return res.render("user/meals", { recommendations: recs });
    return res.json({ recommendations: recs });
  } catch (err) { next(err); }
};
