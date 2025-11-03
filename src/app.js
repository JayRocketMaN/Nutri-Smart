import express from "express";
import config from "./config/index.js";  
import sequelize, {connectDB} from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use("/api/auth", authRoutes);

await connectDB();

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`)
});