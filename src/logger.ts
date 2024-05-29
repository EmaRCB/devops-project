import ecsFormat from "@elastic/ecs-winston-format";
import winston, { format } from "winston";
const { combine, timestamp, printf, colorize } = format;

winston.addColors({
  error: "red",
  warn: "yellow",
  info: "green",
});

const ConsoleFormat = combine(
  colorize({ all: true }),
  timestamp({ format: "DD-MM-YYYY hh:mm" }),
  printf((info) => `[${info.timestamp}|${info.level}] ${info.message}`)
);

const OutputFormat = combine(
  timestamp({ format: "DD/MM/YYYY_hh:mm" }),
  printf((info) => `[${info.timestamp}|${info.level}] ${info.message}`)
);

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ format: ConsoleFormat }),
    new winston.transports.File({
      filename: "log/output.log",
      format: ecsFormat({ convertReqRes: true }),
    }),
  ],
});
