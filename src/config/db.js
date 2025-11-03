const sequelize = new sequelize(
  config.DATABASE_NAME,
  config.DATABASE_USERNAME,
  config.DATABASE_PASSWORD,
  {
    dialect: config.DATABASE_DIALECT,
    dialectOptions: {
      ssl: {
        require: config.ENVIRONMENT !== "dev" ?? false,
        rejectUnauthorized: false,
      },
    },
    port: config.DATABASE_PORT,
    host: config.DATABASE_HOST,
    logging: (msg) => console.log(msg),
  }
);



const sequelize = require('./database');
const healthProfile = require();
const MealSuggestion = require('./models/MealSuggestion');
const UserMealPlan = require('./models/UserMealPlan');

async function createTables() {
  try {
    await sequelize.sync({ force: true });
    console.log('Tables created successfully.');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}



export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Database connected");
  } catch (error) {
    console.log("Database error:", error);
    process.exit(1);
  }
};

export default sequelize;


createTables();