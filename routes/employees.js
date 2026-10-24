const auth = require("../middleware/auth.js")
const routes = require("express").Router();
const validateRequest = require("../middleware/validateRequest");
const {employeeValidationRules} = require("../validators/validationRules");

const {
    getEmployees, createEmployee, getEmployeeId, updateEmployee, deleteEmployee
} = require("../controllers/employeeController");

// Create employee
routes.post(
    "/employees",
    auth,
    employeeValidationRules,
    validateRequest,
    createEmployee
);

// Update employee
routes.put(
    "/employees/:eid",
    auth,
    employeeValidationRules,
    validateRequest,
    updateEmployee
);

// Other employee routes
routes.get("/employees/:eid", auth, getEmployeeId);
routes.delete("/employees", auth, deleteEmployee);
routes.get("/employees", auth, getEmployees);

module.exports = routes
