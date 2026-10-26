// switch this out for pino or winston when you get the chance

const logger = {
  debug(...args: any) {
    console.log('DEBUG:', ...args)
  },
  info(...args: any) {
    console.info("INFO:", ...args)
  },
  error(...args: any) {
    console.error("ERROR:", ...args)
  },
  warn(...args: any) {
    console.warn("WARN:", ...args)
  }
}

export default logger;