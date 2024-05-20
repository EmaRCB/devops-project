import winston, { format } from "winston";
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

winston.addColors({
  error: "red",
  warn: "yellow",
  info: "cyan",
});

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "log/output.log" }),
  ],
  format: combine(label({ label: "Log" }), timestamp(), myFormat),
});
