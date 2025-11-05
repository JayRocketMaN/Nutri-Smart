// src/models/Meal.js

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Meal = sequelize.define("Meal", {
  
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  category: DataTypes.STRING,
  calories: DataTypes.INTEGER,
  protein: DataTypes.FLOAT,
  carbs: DataTypes.FLOAT,
  fat: DataTypes.FLOAT,
  allergens: DataTypes.STRING,
  tags: DataTypes.STRING,
  instructions: DataTypes.TEXT
}, 

{ tableName: "meals", timestamps: true });

export default Meal;
