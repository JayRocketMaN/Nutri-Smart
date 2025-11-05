// src/services/profile.service.js
import { HealthProfile } from "../models/index.js";
export const profileService = {
  async createOrUpdate(userId, data) {
    let p = await HealthProfile.findOne({ where: { userId } });
    if (p) p = await p.update(data);
    else p = await HealthProfile.create({ ...data, userId });
    return p;
  },
  async get(userId) { return await HealthProfile.findOne({ where: { userId } }); },
  async delete(userId) { return await HealthProfile.destroy({ where: { userId } }); }
};
