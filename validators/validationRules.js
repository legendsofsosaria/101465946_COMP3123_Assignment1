const { body } = require("express-validator");

// Employee validation rules
const employeeValidationRules = [
    body("first_name")
        .isString().withMessage("First name must be a string")
        .bail()
        .trim()
        .notEmpty().withMessage("First name is required"),

    body("last_name")
        .isString().withMessage("Last name must be a string")
        .bail()
        .trim()
        .notEmpty().withMessage("Last name is required"),

    body("email")
        .isString().withMessage("Email must be a string")
        .bail()
        .trim()
        .isEmail().withMessage("Please provide a valid email address"),

    body("position")
        .isString().withMessage("Position must be a string")
        .bail()
        .trim()
        .notEmpty().withMessage("Position is required"),

    body("salary")
        .custom(value =>
            typeof value === "number" &&
            Number.isFinite(value) &&
            value >= 0
        )
        .withMessage("Salary must be a non-negative number"),

    body("date_of_joining")
        .isISO8601({ strict: true })
        .withMessage("Please provide a valid date of joining"),

    body("department")
        .isString().withMessage("Department must be a string")
        .bail()
        .trim()
        .notEmpty().withMessage("Department is required")
];

const signupValidationRules = [
    body("username")
        .isString().withMessage("Username must be a string")
        .bail()
        .trim()
        .notEmpty().withMessage("Username is required"),

    body("email")
        .isString().withMessage("Username must be a string")
        .bail()
        .trim()
        .isEmail().withMessage("Please provide a valid email address"),

    body("password")
        .isString().withMessage("Password must be a string")
        .bail()
        .trim()
        .notEmpty().withMessage("Password is required"),
];

const loginValidationRules = [
    body("username")
        .optional()
        .isString().withMessage("Username must be a string")
        .bail()
        .trim()
        .notEmpty().withMessage("Username cannot be empty"),

    body("email")
        .optional()
        .isString().withMessage("Email must be a string")
        .bail()
        .trim()
        .isEmail().withMessage("Please provide a valid email address"),

    body("password")
        .isString().withMessage("Password must be a string")
        .bail()
        .notEmpty().withMessage("Password is required"),

    body().custom((value, { req }) => {
        if (!req.body.username && !req.body.email) {
            throw new Error("Username or email is required");
        }
        return true;
    })
];


module.exports = {
    employeeValidationRules,
    signupValidationRules,
    loginValidationRules
};