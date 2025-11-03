import User from "./user.js";
import healthProfile from "./healthProfile.js";

User.hasOne(healthProfile, { foreignKey: "userId", onDelete: "CASCADE" });
Profile.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

export { User, healthProfile };