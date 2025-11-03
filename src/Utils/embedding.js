// src/utils/embedding.utils.js
import mealPlan  from "../models/mealPlan.js";

export const createEmbedding = async (text) => {
  const resp = await mealPlan.embeddings.create({
    model: "text-embedding-3-small",
    input: text
  });
  return resp.data[0].embedding;
};
