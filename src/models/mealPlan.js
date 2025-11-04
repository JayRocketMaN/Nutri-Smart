import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import meal from './meal.js';  
import healthProfile from './healthProfile.js';

//meal recomendation
const mealPlan = sequelize.define('mealPlan', {
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: healthProfile,
      key: 'user_id',
  },
  },
  meal_id: {
    type: DataTypes.INTEGER,
    references: {
      model: meal,
      key: 'meal_id',
    }
  },
meal_type: {
    type: DataTypes.ENUM('breakfast', 'lunch', 'dinner', 'snack'),
    allowNull: false,
  },
calories: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
        type: DataTypes.TEXT,
  },
 nutritional_info: {
    type: DataTypes.JSON,
  },
  meal_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  servings: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});




//meal and healthProfile relationship
//healthProfile.belongsToMany(meal, { through: mealPlan, foreignKey: 'user_id' });
//meal.belongsToMany(healthProfile, { through: mealPlan, foreignKey: 'meal_id' });

export default mealPlan;