// src/models/index.js

import User from "./user.js";
import HealthProfile from "./healthProfile.js";
import Meal from "./meal.js";
import HealthCondition from "./healthconditions.js";
import OTP from "./otp.js";

User.hasOne(HealthProfile, { foreignKey: "userId", as: "profile", onDelete: "CASCADE" });
HealthProfile.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(OTP, { foreignKey: "email", sourceKey: "email", as: "otps" });

export { User, HealthProfile, Meal, HealthCondition, OTP };
