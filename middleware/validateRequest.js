const { validationResult } = require('express-validator');
const {  securityLogger} = require("../utils/logger");

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        securityLogger.warn(
            { errors: errors.array(), path: req.path, method: req.method },
            "Request validation failed"
        );
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.array()
        });
    }

    next();
};

module.exports = validateRequest;
