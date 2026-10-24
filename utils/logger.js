const pino = require("pino");
const fs = require("fs");
const path = require("path");

const logDirectory = path.join(__dirname, "../logs");

// Create the logs directory if it doesn't exist
fs.mkdirSync(logDirectory, {recursive: true});

const allLogs = pino.destination({
    dest: path.join(logDirectory, "app.log"),
    sync: false
});

const errorLogs = pino.destination({
    dest: path.join(logDirectory, "error.log"),
    sync: false
});

const logger = pino(
    {
        level: process.env.LOG_LEVEL || "info"
    },
    allLogs
);

const errorLogger = pino(
    {
        level: "error"
    },
    errorLogs
);

module.exports = {logger, errorLogger};