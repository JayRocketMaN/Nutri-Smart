// src/models/HealthCondition.js

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const HealthCondition = sequelize.define("HealthCondition", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  condition: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.STRING,
  recommendedNutrients: DataTypes.STRING,
  restrictedNutrients: DataTypes.STRING,
  recommendedFoods: DataTypes.STRING,
  restrictedFoods: DataTypes.STRING
}, { tableName: "health_conditions", timestamps: false });

export default HealthCondition;
