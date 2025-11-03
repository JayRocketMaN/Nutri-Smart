import sequelize from "../db.js";
import { DataTypes } from 'sequelize';



const healthProfile = sequelize.define('healthProfile', {
  user_id: {
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
  activity_level: {
    type: DataTypes.ENUM('sedentary', 'lightly active', 'moderately active', 'very active'),
    allowNull: false,
  },
  health_condition: {
    type: DataTypes.ENUM('diabetes', 'heart disease', 'high blood pressure', 'high cholesterol', 'obesity'),
    allowNull: true,
  },
  food_allergies: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  dietary_preferences: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default healthProfile;

