const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const { promisify } = require("node:util");

// Sign up a new user
const signup = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email and password are required"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const normalizedUsername = username.trim();

        const existingUser = await UserModel.findOne({
            $or: [
                { email: normalizedEmail },
                { username: normalizedUsername }
            ]
        });

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

        await newUser.save();

        return res.status(201).json({
            message: "User registered successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Log in a user
const login = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if ((!email && !username) || !password) {
            return res.status(400).json({
                message: "Email or username and password are required"
            });
        }

        const user = await UserModel.findOne(
            email
                ? { email: email.trim().toLowerCase() }
                : { username: username.trim() }
        ).select("+password");

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const comparePassword = promisify(
            user.comparePassword.bind(user)
        );

        const isPasswordValid = await comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
        );

        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = { signup, login };