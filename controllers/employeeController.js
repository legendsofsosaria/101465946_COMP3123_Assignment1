const employeeModel = require("../models/employee");
const jwt = require("jsonwebtoken");
const validateEmployee = require("../utils/validateEmployee");


const getEmployees = async (req, res) => {
    try {
        // Find all employees that match the requesting user's id from the database
        const employees = await employeeModel.find({ user: req.user.id });
        return res.status(200).json(employees);
    }
    // Handle errors
    catch (error) {
        console.error(error);
        return res.status(500).json({message: "Server error"});
    }
};

const createEmployee = async(req, res) => {
    try {
        // Use our validation utility helper to validate the data
        const validationError = validateEmployee(req.body);
        if (validationError) {
            return res.status(400).json({
                message: validationError
            });
        }

        const {
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department
        } = req.body;

        const existingEmployee = await employeeModel.findOne({
            email: email.trim().toLowerCase(),
            user: req.user.id
        });
        if (existingEmployee) {
            return res.status(400).json({ message: "Employee already exists" });
        }

        // Remove whitespace
        const employeeData = {
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            email: email.trim().toLowerCase(),
            position: position.trim(),
            salary,
            date_of_joining,
            department: department.trim(),
            user: req.user.id
        };

        // Associate authenticated user
        const newEmployee = new employeeModel(employeeData);
        await newEmployee.save();

        return res.status(201)
            .json({message: "Employee created successfully",
                employee: newEmployee});
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({message: "Server error"});
    }
}

// Get employee by id
const getEmployeeId = async(req, res) => {
    try {
        // Find the employee that matches the provided eid from the request params
        const employee = await employeeModel.findOne({
            _id: req.params.eid,
            user: req.user.id
        });

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        return res.status(200).json(employee);
    }
    // Handle errors
    catch(error) {
        console.error(error);
        return res.status(500).json({message: "Server error"});
    }
}

// Update employee
const updateEmployee = async(req, res) => {
    try {
        const { eid } = req.params;

        // Only allow employee fields to be updated
        const allowedFields = [
            "first_name",
            "last_name",
            "email",
            "position",
            "salary",
            "date_of_joining",
            "department"
        ];

        const updateData = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                message: "At least one valid employee field is required"
            });
        }

        // Use our validation utility helper to validate the data
        const validationError = validateEmployee(req.body);
        if (validationError) {
            return res.status(400).json({
                message: validationError
            });
        }

        // Find and update the employee belonging to this user
        const employee = await employeeModel.findOneAndUpdate(
            {
                _id: eid,
                user: req.user.id
            },
            { $set: updateData },
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        return res.status(200).json({
            message: "Employee updated successfully",
            employee
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};

// Delete employee with matching ID
const deleteEmployee = async(req, res) => {
    try {
        // get the employee ID from the request query
        const { eid } = req.query;

        // Make sure the eid was provided
        if (!eid) {
            return res.status(400).json({message: "Employee ID is required"});
        }

        // Find one in the database that matches and delete, make sure the user matches requesting user
        const employee = await employeeModel.findOneAndDelete({
            _id: eid,
            user: req.user.id
        });

        // If the employee doesn't exist, send 404 not found
        if (!employee) {
            return res.status(404).json({message: "Employee not found!"});
        }

        return res.status(204).send();
    }
    // Handle errors
    catch(error) {
        console.error(error);
        return res.status(500).json({message: "Server error"});
    }
}

module.exports = { getEmployees, createEmployee, getEmployeeId, updateEmployee, deleteEmployee};

