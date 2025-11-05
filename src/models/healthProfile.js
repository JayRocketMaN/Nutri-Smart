// src/models/HealthProfile.js

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const HealthProfile = sequelize.define("HealthProfile", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  age: DataTypes.INTEGER,
  gender: DataTypes.STRING,
  allergies: DataTypes.STRING,
  conditions: DataTypes.STRING,
  dietaryGoal: DataTypes.STRING,
  notes: DataTypes.TEXT
}, { tableName: "profiles", timestamps: true });

export default HealthProfile;
