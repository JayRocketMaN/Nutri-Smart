import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Food library retrieved successfully!" });
});

router.post("/", (req, res) => {
  res.json({ message: "Food item added successfully!" });
});

export default router;
