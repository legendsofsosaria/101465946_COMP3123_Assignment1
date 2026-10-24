const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const { promisify } = require("node:util");
const { logger, errorLogger } = require("../utils/logger");

// Sign up a new user
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if they left one of the required fields empty
        if (
            ((!email || !email.trim()) && (!username || !username.trim())) ||
            !password || !password.trim()
        ) {
            errorLogger.error(
                { err: "Registrations field empty" },
            );
            return res.status(400).json({
                message: "Email or username and password are required"
            });
        }

        // Validate that the email looks like a valid email address
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            errorLogger.error(
                { err: "Invalid email address provided" },
            );
            return res.status(400).json({
                message: "Please provide a valid email address"
            });
        }

        // Remove whitespace
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedUsername = username.trim();

        // Check if email or username exists in the db
        const existingUser = await UserModel.findOne({
            $or: [
                { email: normalizedEmail },
                { username: normalizedUsername }
            ]
        });

        // If the user already exists, reject the registration
        if (existingUser) {
            errorLogger.error(
                { err: "Duplicate registration" },
            );
            return res.status(409).json({
                message: "Username or email already exists"
            });
        }

        const newUser = new UserModel({
            username: normalizedUsername,
            email: normalizedEmail,
            password
        });

        // Save the info to db
        await newUser.save();

        // Log successfully saving employee
        logger.info(
            { userId: newUser._id },
            "User registered successfully"
        );

        // Return success message and created status code
        return res.status(201).json({
            message: "User registered successfully"
        });
    }
    // Handle errors and log them
    catch (error) {
        errorLogger.error(
            { err: error },
            "Failed to register user"
        );
        return res.status(500).json({ message: "Server error" });
    }
};

// Log in a user
const login = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if any of the fields are empty
        if (
            ((!email || !email.trim()) && (!username || !username.trim())) ||
            !password || !password.trim()
        ) {
            errorLogger.error(
                { err: "Login fields left empty" },
            );
            return res.status(400).json({
                message: "Email or username and password are required"
            });
        }

        // Convert email to lowercase
        const user = await UserModel.findOne(
            email
                ? { email: email.toLowerCase() }
                : { username: username }
        ).select("+password");


        // username or email doesn't exist
        if (!user) {
            errorLogger.error(
                { err: "Invalid credentials" },
            );
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // check the password against the stored hashed password
        const comparePassword = promisify(
            user.comparePassword.bind(user)
        );

        const isPasswordValid = await comparePassword(password);

        // Password isn't valid
        if (!isPasswordValid) {
            errorLogger.error(
                { err: "Invalid credentials" },
            );
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // Password is valid, assign the token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
        );

        // Log success
        logger.info(
            { userId: user._id },
            "User logged in successfully"
        );

        return res.status(200).json({ token });
    }
        // Handle errors and log them
    catch (error) {
        errorLogger.error(
            { err: error },
            "Failed to log in user"
        );
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = { signup, login };