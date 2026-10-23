const EmployeeModel = require("../models/employee")
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.js")
const routes = require("express").Router()

const {
    getEmployees, createEmployee, getEmployeeId, updateEmployee, deleteEmployee
} = require("../controllers/employeeController");

routes.get("/employees", auth, getEmployees); // /api/v1/emp/employees
routes.post("/employees", auth, createEmployee); // /api/v1/emp/employees
routes.get("/employees/:eid", auth, getEmployeeId); // /api/v1/emp/employees/{eid}
routes.put("/employees/:eid", auth, updateEmployee); // /api/v1/emp/employees/{eid}
routes.delete("/employees", auth, deleteEmployee) // /api/v1/emp/employees?eid=xxx

module.exports = routes
