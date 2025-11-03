// src/services/recommendation.service.js
import { healthProfile } from "../models/index.js";
import  Meal  from "../models/meal.js";
import  mealPlan  from "../models/mealPlan.js";
import { createEmbedding } from "../Utils/embedding.js";
import  cacheManager  from "../Utils/cacheManager.js";

function cosine(a,b){
  let dot=0, na=0, nb=0;
  for(let i=0;i<a.length;i++){ dot+=a[i]*b[i]; na+=a[i]*a[i]; nb+=b[i]*b[i]; }
  return dot/(Math.sqrt(na)*Math.sqrt(nb)+1e-10);
}

async function ensureEmbedding(meal){
  if (mealPlan.embedding && Array.isArray(mealPlan.embedding)) return mealPlan.embedding;
  const text = `${meal.name}. Tags:${meal.tags||""}. Allergens:${meal.allergens||""}. Nutrition: ${meal.calories} kcal, protein ${meal.protein}g.`;
  const vec = await createEmbedding(text);
  mealPlan.embedding = vec;
  await meal.save();
  return vec;
}

async function generateExplanations(profile, selectedMeals){
  const profileText = `Age:${profile.age} Conditions:${profile.conditions} Allergies:${profile.allergies} Goal:${profile.dietaryGoal}`;
  const mealsText = selectedMeals.map(m => `${m.name}: ${m.calories} kcal, ${m.protein}g protein, tags:${m.tags||""}`).join("\n");
  const prompt = `You are a nutrition assistant. User: ${profileText}\nMeals:\n${mealsText}\nReturn JSON array: [{ "name":"...", "explanation":"...", "tip":"..." }]`;
  const chat = await mealPlan.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 400
  });
  const content = chat.choices?.[0]?.message?.content || "";
  try { return JSON.parse(content); }
  catch { return selectedMeals.map(m => ({ name: m.name, explanation: "Suitable", tip: "Maintain portion control" })); }
}

export const recommendationService = {
  async getForUser(userId, topK = 6) {
    const cacheKey = `recs:${userId}`;
    const cached = await cacheManager.get(cacheKey);
    if (cached) return cached;

    const profile = await healthProfile.findOne({ where: { userId }});
    if (!profile) throw new Error("Create health profile first");
    const profileText = `age:${profile.age} conditions:${profile.conditions} allergies:${profile.allergies} goal:${profile.dietaryGoal}`;
    const embResp = await mealPlan.embeddings.create({ model: "text-embedding-3-small", input: profileText });
    const userVec = embResp.data[0].embedding;

    const meals = await Meal.findAll();
    const mealVecs = await Promise.all(meals.map(async m => ({ meal: m, vec: await ensureEmbedding(m) })));
    const scored = mealVecs.map(({ meal, vec}) => ({ meal, score: cosine(userVec, vec) }));
    scored.sort((a,b)=>b.score-a.score);
    const top = scored.slice(0, topK).map(s=>s.meal);

    const explanations = await generateExplanations(profile, top);

    const out = top.map(m => {
      const ex = explanations.find(e => e.name && e.name.toLowerCase().includes(m.name.toLowerCase())) || {};
      return { id: m.id, name: m.name, calories: m.calories, protein: m.protein, carbs: m.carbs, fat: m.fat, allergens: m.allergens, tags: m.tags, explanation: ex.explanation || null, tip: ex.tip || null };
    });

    await cacheManager.set(cacheKey, out, 600);
    return out;
  }
};
