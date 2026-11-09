import winston from "winston";

const logger = winston.createLogger({
  level: "info", // Default log level
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamp to logs
    winston.format.json(), // Use JSON format for structured logger
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Colorize logs for better readability in console
        winston.format.simple(),
      ),
    }), // Log to console
    new winston.transports.File({
      filename: "src/logs/error.log",
      level: "error",
    }), // Log errors to a file
    new winston.transports.File({ filename: "src/logs/combined.log" }), // Log all levels to another file
  ],
});

export const morganStream = {
  write: (message: string) => {
    logger.info(message.trim()); // Use the logger to log morgan messages
  },
};

export default logger;
