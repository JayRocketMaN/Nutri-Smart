import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Allergy warnings retrieved successfully!" });
});

router.post("/", (req, res) => {
  res.json({ message: "Allergy warning added successfully!" });
});

export default router;
