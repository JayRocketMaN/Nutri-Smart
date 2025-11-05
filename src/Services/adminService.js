// src/services/admin.service.js
import Meal from "../models/meal.js";
import { cacheService } from "../Services/cacheService.js";

async function invalidateAllRecs() { await cacheService.delPattern("recs:*"); }

export const adminService = {
  async createMeal(data) {
    const meal = await Meal.create(data);
    await invalidateAllRecs();
    return meal;
  },
  async updateMeal(id, data) {
    const meal = await Meal.findByPk(id);
    if (!meal) throw new Error("Meal not found");
    await meal.update(data);
    await invalidateAllRecs();
    return meal;
  },
  async deleteMeal(id) {
    const meal = await Meal.findByPk(id);
    if (!meal) throw new Error("Meal not found");
    await meal.destroy();
    await invalidateAllRecs();
    return true;
  },
  async listMeals() { return await Meal.findAll({ order: [["createdAt","DESC"]] }); }
};
