const UserModel = require("../models/user")
const jwt = require("jsonwebtoken");
const routes = require("express").Router()

//register a new user
routes.post("/register", async (req, res) => {

});

//login a user
routes.post("/login", async (req, res) => {

});

module.exports = routes
