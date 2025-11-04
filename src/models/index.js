import user from "./user.js"
import healthProfile from "./healthProfile.js";
import meal from "./meal.js";
import mealPlan from "./mealPlan.js";

healthProfile.belongsToMany(meal, { through: mealPlan, foreignKey: 'user_id' });
meal.belongsToMany(healthProfile, { through: mealPlan, foreignKey: 'meal_id' });

export default {user, healthProfile, meal};