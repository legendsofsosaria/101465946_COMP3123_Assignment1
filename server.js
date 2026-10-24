const express = require('express')
const employeeRoutes = require("./routes/employees")
const userRoutes = require("./routes/users")
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require("helmet");
const pinoHttp = require("pino-http");
const { rateLimit } = require("express-rate-limit");
const { logger } = require("./utils/logger");


dotenv.config();

const app = express();

// MongoDB connection
const SERVER_PORT = process.env.SERVER_PORT || 3002
const CONNECTION_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/comp3123_assignment1'

// Security headers
app.use(helmet());

// Parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP request logging
app.use(
    pinoHttp({
        logger,

        // Never log request headers, which can contain JWTs.
        // Exclude query strings in case they contain sensitive data.
        serializers: {
            req(req) {
                return {
                    method: req.method,
                    url: req.url.split("?")[0]
                };
            }
        },

        // Log unsuccessful responses at higher severity levels.
        customLogLevel(req, res, err) {
            if (err || res.statusCode >= 500) {
                return "error";
            }

            if (res.statusCode >= 400) {
                return "warn";
            }

            return "info";
        }
    })
);

// Rate limiting: 100 requests per IP per 15 minutes
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,

    handler(req, res) {
        logger.warn(
            {
                method: req.method,
                path: req.path,
                statusCode: 429
            },
            "API rate limit exceeded"
        );

        return res.status(429).json({
            message: "Too many requests. Please try again later."
        });
    }
});

// Apply rate limiting to API endpoints
app.use("/api", apiLimiter);

// API routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/emp", employeeRoutes);

// Home page
app.route("/").get((req, res) => {
    res.send("<h1>Assignment 1</h1>");
});

// GET /health requirement
app.get("/health", (req, res) => {
    const dbConnected = mongoose.connection.readyState === 1;

    return res.status(dbConnected ? 200 : 503).json({
        status: dbConnected ? "OK" : "Unavailable",
        database: dbConnected ? "Connected" : "Disconnected"
    });
});


// Handle unknown routes
app.use((req, res) => {
    return res.status(404).json({
        error: "Route not found"
    });
});

// Connect to MongoDB
mongoose
    .connect(CONNECTION_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        logger.error({ err }, "MongoDB connection failed");
    });

// Start server
app.listen(SERVER_PORT, () =>{
    logger.info(
        { port: SERVER_PORT },
        "Server started successfully"
    );
});