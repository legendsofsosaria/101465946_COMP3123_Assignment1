const EmployeeModel = require("../models/employee")
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.js")
const routes = require("express").Router()

const {
    getEmployees,
    createEmployee
} = require("../controllers/employeeController");



module.exports = routes
