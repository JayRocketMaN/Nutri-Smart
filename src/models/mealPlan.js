import { DataTypes } from 'sequelize';
import sequelize from '../config/db';
import meal from './meal.js';  
import healthProfile from './healthProfile.js';

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
mealType: {
    type: DataTypes.ENUM('breakfast', 'lunch', 'dinner', 'snack'),
    references: {
      model: meal,
      key: 'meal_id',
  },
},
  calories: {
    type: DataTypes.INTEGER,
    references: {
      model: meal,
      key: 'meal_id',
    },
 description: {
    type: DataTypes.TEXT,
    references: {
      model: meal,
      key: 'meal_id',
    },
 nutritionalInfo: {
    type: DataTypes.JSON,
    references: {
      model: meal,
      key: 'meal_id',
    },
  },
  mealTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  servings: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}
},
});

//meal and healthProfile relationship
healthProfile.belongsToMany(meal, { through: mealPlan, foreignKey: 'user_id' });
meal.belongsToMany(healthProfile, { through: mealPlan, foreignKey: 'meal_id' });

export default mealPlan;