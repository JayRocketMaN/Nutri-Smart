// src/mainApp.js

import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/authRoutes.js";
import profileRoutes from "./Routes/profileRoutes.js";
import mealRoutes from "./Routes/mealRoutes.js";
import { APP_CONFIG } from "./config/config.js";
import { errorHandler } from "./Middleware/errorHandler.js";

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));

app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), "public")));

app.use((req,res,next) => { APP_CONFIG.LOGGER.info(`${req.method} ${req.originalUrl}`); next(); });

// EJS pages
app.get("/", (req,res) => res.render("user/dashboard"));
app.get("/auth/login", (req,res) => res.render("user/login"));
app.get("/auth/register", (req,res) => res.render("user/register"));
app.get("/health/form", (req,res) => res.render("user/healthProfile"));

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/meals", mealRoutes);

// error handler
app.use(errorHandler);

export default app;
