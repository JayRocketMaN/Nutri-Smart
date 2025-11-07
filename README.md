## NUTRI_SMART
# Project Details

NutriSmart is a simple mobile/web application designed to recommend personalized meals and provide detailed nutritional breakdowns based on the user’s preferences, dietary needs, or health conditions.
The goal is to promote healthier eating habits through smart food recommendations powered by nutritional data.

# Features

- NutriSmart helps users discover meals that are best suited for people with specific health conditions or those who want to maintain a healthy diet. 
- It recommends nutritious meals based on user preferences and health needs while providing a clear breakdown of each meal’s nutritional content, such as calories, proteins, fats, and vitamins.

# Tech Stack
- Backend Development

# Dependencies
- express – Web server framework
- bcrypt – For password hashing and authentication
- jsonwebtoken (JWT) – For user authentication
- express-validator – For input validation
- nodemailer – For sending emails
- axios – For consuming external nutrition APIs
- redis – For caching frequently accessed data
- pino – For structured logging

# Development Dependencies
- nodemon – Automatically restarts the server during development

# Github Repository
https://github.com/JayRocketMaN/Nutri-Smart.git

# Installation and Setup
1. Create a project folder
mkdir nutri_smart_project

2. Navigate into the folder
cd nutri_smart_project

3. Clone the repository
git clone https://github.com/JayRocketMaN/Nutri-Smart.git


4. Install dependencies
npm install

5. Install dev dependencies
npm install nodemon --save-dev

6. Configure environment variables




7. Running the App
Start the server once:
npm start

Or run with live updates (nodemon):
npm run dev

Folder Structure
nutri-smart-backend/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── 
│   │   ├── 
│   │   ├── 
│   │   └── 
│   │
│   ├── middleware/
│   │   ├── 
│   │   └── 
│   │
│   ├── models/
│   │   ├── user.js
│   │   ├── meal.js
│   │   ├── healthProfile.js
│   │   └── mealPlan.js
│   │
│   ├── routes/
│   │   ├── 
│   │   ├── 
│   │   ├── 
│   │   └── 
│   │
│   ├── utils/
│   │   ├── AppError.js
│   │   ├── Auth.js
│   │   ├── Validator.js
│   │   └── 
│   │
│   ├── app.js
│   └── 
│
├── .env
├── package.json
└── README.md

