import sequelize from "../config/db.js";
import { DataTypes } from 'sequelize';



const healthProfile = sequelize.define('healthProfile', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  height: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  activityLevel: {
    type: DataTypes.ENUM('sedentary', 'lightly active', 'moderately active', 'very active'),
    allowNull: false,
  },
  healthCondition: {
    type: DataTypes.ENUM('diabetes', 'heart disease', 'high blood pressure', 'high cholesterol', 'obesity'),
    allowNull: true,
  },
  foodAllergies: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  dietaryPreferences: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default healthProfile;

