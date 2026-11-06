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
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(
      ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`,
    ),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "app.log" }),
  ],
});

// add error.log file
// please put all log files in the logs folder -> instead of <root>/app.log -> src/logs/<filename>.log

export default logger;
