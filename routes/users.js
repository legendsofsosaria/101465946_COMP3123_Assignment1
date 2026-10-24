const routes = require("express").Router();
const { signup, login } = require("../controllers/userController");
const {signupValidationRules, loginValidationRules} = require("../validators/validationRules");
const validateRequest = require("../middleware/validateRequest");


routes.post("/signup", signupValidationRules, validateRequest, signup);
routes.post("/login", loginValidationRules, validateRequest, login);

module.exports = routes;
