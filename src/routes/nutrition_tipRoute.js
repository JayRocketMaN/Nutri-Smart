import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Nutrition tips retrieved successfully!" });
});

router.post("/", (req, res) => {
  res.json({ message: "New nutrition tip added successfully!" });
});

export default router;
