// src/adminApp.js
import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import adminEjsRoutes from "./routes/adminEjs.routes.js";
import adminApiRoutes from "./routes/admin.routes.js";
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

app.use((req,res,next) => { APP_CONFIG.LOGGER.info(`ADMIN ${req.method} ${req.originalUrl}`); next(); });

app.get("/", (req,res) => res.redirect("/dashboard"));
app.use("/", adminEjsRoutes);
app.use("/api", adminApiRoutes);

app.use(errorHandler);

export default app;
