import express from "express";
import dotenv from "dotenv";

import authRoute from "./routes/authRoute.js";
import foodLibraryRoute from "./routes/food_libraryRoute.js";
import healthProfileRoute from "./routes/health_profileRoute.js";
import mealSuggestionRoute from "./routes/meal_suggestionRoute.js";
import nutritionTipRoute from "./routes/nutrition_tipRoute.js";
import allergyWarningRoute from "./routes/allergy_warningRoute.js";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/food-library", foodLibraryRoute);
app.use("/api/health-profile", healthProfileRoute);
app.use("/api/meal-suggestion", mealSuggestionRoute);
app.use("/api/nutrition-tip", nutritionTipRoute);
app.use("/api/allergy-warning", allergyWarningRoute);

app.get("/", (req, res) => {
  res.send("Nutri Smart API running successfully 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
