const jwt = require("jsonwebtoken");
const { securityLogger } = require("../utils/logger");

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];

    if(!authHeader) {
        securityLogger.warn(
            { method: req.method, path: req.path },
            "Authentication failed: no token provided"
        );
        return res.status(401).json({ message: "No token provided" });
    }

    //authorization: Bearer TOKEN
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        securityLogger.warn(
            { method: req.method, path: req.path },
            "Authentication failed: no token provided"
        );
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        securityLogger.warn(
            { method: req.method, path: req.path },
            "Authentication failed: invalid token"
        );
        return res.status(403).json({ message: "Invalid token" });
    }
}

module.exports = authenticateToken;