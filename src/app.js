import express from "express";
import process from "node:process";
import config from "./config/index.js";
import sequelize, { connectDB } from "./config/db.js";
import models from "./models/index.js";



//init express app
const app = express();


//routes
app.get("/api/health", (req, res) => {
  res.json({ status: "API is running fine and healthy" });
});


// route defaults
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route does not exist" });
});

await sequelize.sync({alter: true});
await connectDB();

app.listen(config.PORT, () => {
  console.log('Server running on port ${config.PORT}');
});

export default sequelize;

























