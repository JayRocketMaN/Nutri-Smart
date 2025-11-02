import { DataTypes } from 'sequelize';
import sequelize from '../config/db';
import meal from './meal.js';  
import healthProfile from './healthProfile.js';

const mealPlan = sequelize.define('mealPlan', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: healthProfile,
      key: 'userId',
    },
  },
  mealId: {
    type: DataTypes.INTEGER,
    references: {
      model: meal,
      key: 'mealId',
    }
  },
mealType: {
    type: DataTypes.ENUM('breakfast', 'lunch', 'dinner', 'snack'),
    references: {
      model: meal,
      key: 'mealId',
  },
},
  calories: {
    type: DataTypes.INTEGER,
    references: {
      model: meal,
      key: 'mealId',
    },
 description: {
    type: DataTypes.TEXT,
    references: {
      model: meal,
      key: 'mealId',
    },
 nutritionalInfo: {
    type: DataTypes.JSON,
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

healthProfile.belongsToMany(meal, { through: mealPlan, foreignKey: 'userId' });
meal.belongsToMany(healthProfile, { through: mealPlan, foreignKey: 'mealId' });

export default mealPlan;