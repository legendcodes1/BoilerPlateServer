// switch this out for pino or winston when you get the chance

// const logger = {
//   debug(...args: any) {
//     console.log('DEBUG:', ...args)
//   },
//   info(...args: any) {
//     console.info("INFO:", ...args)
//   },
//   error(...args: any) {
//     console.error("ERROR:", ...args)
//   },
//   warn(...args: any) {
//     console.warn("WARN:", ...args)
//   }
// }
// export default logger;

import { createLogger, format, transports } from "winston";

const logger = createLogger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  level: "info", // Set the default log level
  format: format.combine(format.colorize(), format.timestamp(), format.json()),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(), // Colorize logs for better readability in console
        format.simple(),
      ),
    }),
    new transports.File({
      filename: "src/logs/error.log",
      level: "error",
    }),
    new transports.File({ filename: "src/logs/combined.log" }),
  ],
});

// add error.log file
// please put all log files in the logs folder -> instead of <root>/app.log -> src/logs/<filename>.log
export const morganStream = {
  write: (message: string) => {
    logger.info(message.trim()); // Use the logger to log morgan messages
  },
};

export default logger;
