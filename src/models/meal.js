import sequelize from "../config/db.js"; 
import { DataTypes } from "sequelize";


const meal = sequelize.define('meal', {
  meal_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  meal_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  meal_type: {
    type: DataTypes.ENUM('breakfast', 'lunch', 'dinner', 'snack'),
    allowNull: false,
  },
  description: {
        type: DataTypes.TEXT,
  },
  calories: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nutritional_info: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cooking_instructions: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
})
   {
    indexes: [
      {
        unique: true,       // Unique index
        fields: ['meal_id']   // Column(s) to index
      },
    ]
  };

export default meal;

