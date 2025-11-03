import express from "express";
const router = express.Router();

router.post("/recommend", (req, res) => {
  res.json({ message: "Meal suggestions generated successfully!" });
});

router.get("/", (req, res) => {
  res.json({ message: "All meal suggestions retrieved successfully!" });
});

export default router;
