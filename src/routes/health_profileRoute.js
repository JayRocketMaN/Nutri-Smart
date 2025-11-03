import express from "express";
const router = express.Router();

router.get("/:userId", (req, res) => {
  res.json({ message: `Health profile for user ${req.params.userId}` });
});

router.post("/", (req, res) => {
  res.json({ message: "Health profile created successfully!" });
});

router.put("/:userId", (req, res) => {
  res.json({ message: `Health profile for user ${req.params.userId} updated successfully!` });
});

export default router;
