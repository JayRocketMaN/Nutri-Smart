
import { body } from "express-validator";

const registrationValidator = [
  body("full_name")
    .notEmpty()
    .withMessage("full name is required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("full Name must be at least 3 characters long"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("confirmPassword").custom((value, { req }) => {
    if (req.body.password && value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),

];

const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Invalid Email or Password")
    .bail()
    .isEmail()
    .withMessage("Invalid Email or Password"),
  body("password").notEmpty().withMessage("Invalid Email or Password"),
];

const profileValidator = [
    body("age")
        .notEmpty()
        .withMessage("Age is required")
        .bail()
        .isInt({ min: 1, max: 120 })
        .withMessage("Age must be a valid number between 1 and 120"),

    body("gender")
        .notEmpty()
        .withMessage("Gender is required")
        .bail()
        .isIn(["male", "female", "others"])
        .withMessage("Gender should be male, female or others"),
    
    body("weight")
        .notEmpty()
        .withMessage("Weight is required")
        .bail()
        .isFloat({ min: 1, max: 500 })
        .withMessage("Weight must be a valid number in kilograms (1–500 kg)"),

    body("height")
        .notEmpty()
        .withMessage("Height is required")
        .bail()
        .isFloat({ min: 30, max: 300 })
        .withMessage("Height must be a valid number in centimeters (30–300 cm)"),

    body("activity_level")
        .notEmpty()
        .withMessage("Activity level is required")
        .bail()
        .isIn(["sedentary", "lightly active", "moderately active", "very active"])
        .withMessage(
        "Activity level must be one of: sedentary, lightly active, moderately active, very active"),
];

const healthConditionValidator = [
    body("healthConditions")
        .optional()
        .isArray()
        .withMessage("Select one or more valid health conditions")
        .bail()
        .custom((value) => {
            const allowedConditions = [
                "Diabetes",
                "Heart Disease",
                "High Blood Pressure",
                "High Cholesterol",
                "Obesity",
            ];
            const invalid = value.filter((cond) => !allowedConditions.includes(cond));
            if (invalid.length > 0) {
                throw new Error(`Invalid health condition(s): ${invalid.join(", ")}`);
            }
            return true;
        }),
];

const foodConditionValidator = [
      body("foodAllergies")
        .optional()
        .isArray()
        .withMessage("Select one or more valid Food Category")
        .bail()
        .custom((value) => {
            const allowedConditions = [ "Nuts", "Dairy", "Gluten", "Shellfish", "Soy", "Eggs" ];
            const invalid = value.filter((cond) => !allowedConditions.includes(cond));
            if (invalid.length > 0) {
                throw new Error(`Invalid Food Allergies: ${invalid.join(", ")}`);
            }
            return true;
        }),

         body("Dietary")
        .optional()
        .isArray()
        .withMessage("Select one or more valid Dietary Category")
        .bail()
        .custom((value) => {
            const allowedConditions = [ "Vegetarian", "vegan", "Keto", "Low-Carb", "Low-Fat", "Halal", "Kosher", ];
            const invalid = value.filter((cond) => !allowedConditions.includes(cond));
            if (invalid.length > 0) {
                throw new Error(`Invalid Dietary preferences:  ${invalid.join(", ")}`);
            }
            return true;
        }),
];



export { registrationValidator, loginValidator, profileValidator, healthConditionValidator, foodConditionValidator };
