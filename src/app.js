import express from 'express';

import APP_CONFIG from './config/APP_CONFIG.js';
import logger from './config/logger.js';
import sequelize from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';

import { authRoutes, healthProfileRoutes, uploadRoutes, mealRoutes } from './routes/index.js';
import { authMiddleware } from './Middleware/authMiddleware.js';
import { errorHandler, notFound } from './Middleware/errorHandler.js';
import { initRedis } from './config/cache.js';


const app = express();
const port = APP_CONFIG.PORT;

// Security setup
app.use(helmet());
app.use(cors());

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("../uploads"));


// Routes
app.get('/', (req, res) => {
    res.send('Welcome to Nutrismart Recommendation System API');
});

app.use('/api/auth', authRoutes);
app.use('/api/healthProfile', authMiddleware, healthProfileRoutes);
app.use('/api/uploads', authMiddleware, uploadRoutes);
app.use('/api/recommend', authMiddleware, mealRoutes);



// Error handlers

// 404
app.use(notFound);

// Global error handler
app.use(errorHandler);

// Connecting to Redis
(async () => {
    try {
        await initRedis();
        logger.info("Redis ssuccessufully initialised.")
    } catch (error) {
        logger.error(`Failed to connect to Redis: ${error.message}`)
    };
})();

// Sync database 
sequelize.sync()
    .then(() => {
        logger.info('Database synchronized successfully');
        app.listen(port, () => { 
          logger.info(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        logger.error({ err: error }, 'Error synchronizing database:');
        process.exit(1);
    });

