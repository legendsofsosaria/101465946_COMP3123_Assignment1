const routes = require("express").Router();
const { signup, login } = require("../controllers/userController");

routes.post("/signup", signup);
routes.post("/login", login);

module.exports = routes;
