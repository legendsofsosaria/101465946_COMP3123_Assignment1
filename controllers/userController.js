const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const { promisify } = require("node:util");

// Sign up a new user
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if they left one of the required fields empty
        if (
            ((!email || !email.trim()) && (!username || !username.trim())) ||
            !password || !password.trim()
        ) {
            return res.status(400).json({
                message: "Email or username and password are required"
            });
        }

        // Validate that the email looks like a valid email address
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
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

        // Return success message and created status code
        return res.status(201).json({
            message: "User registered successfully"
        });
    } catch (error) {
        console.error(error);
        // Handle errors and return an error code
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

        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        // Handle errors and return an error code
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = { signup, login };