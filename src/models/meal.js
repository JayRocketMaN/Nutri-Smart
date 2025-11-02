import sequelize from "../db.js"; 
import { DataTypes } from "sequelize";


const meal = sequelize.define('meal', {
  mealId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  mealName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mealType: {
    type: DataTypes.ENUM('breakfast', 'lunch', 'dinner', 'snack'),
    allowNull: false,
  },
  description: {
        type: DataTypes.TEXT,
        allowNull: false,
  },
  calories: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nutritionalInfo: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cookingInstructions: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default meal;

