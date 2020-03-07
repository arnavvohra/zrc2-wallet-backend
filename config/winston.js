var winston = require("winston");
require("winston-daily-rotate-file");
const rTracer = require("cls-rtracer");

var errorTransport = new winston.transports.DailyRotateFile({
  maxSize: "5m",
  maxFiles: "30",
  filename: `${process.env.logPath}/log/error-%DATE%.log`,
  datePattern: "DD-MM-YYYY h",
  level: "error"
});

var appTransport = new winston.transports.DailyRotateFile({
  maxSize: "5m",
  maxFiles: "30",
  filename: `${process.env.logPath}/log/App-%DATE%.log`,
  datePattern: "DD-MM-YYYY h",
  level: "info"
});

var accessTransport = new winston.transports.DailyRotateFile({
  maxSize: "5m",
  maxFiles: "30",
  filename: `${process.env.logPath}/log/Access-%DATE%.log`,
  datePattern: "DD-MM-YYYY h",
  level: "info"
});

var consoleTransport = new winston.transports.Console({
  level: "debug"
});

var logger = function(module) {
  var path = module.filename
    .split("/")
    .slice(-3)
    .join("/");
  return winston.createLogger({
    zippedArchive: false,
    format: winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
      }),
      winston.format.printf(info => {
        const rid = rTracer.id();
        return `${info.timestamp} [${
          info.level
        }] [request-id:${rid}] ${path} - ${info.message}`;
      })
    ),
    transports: [errorTransport, appTransport, consoleTransport]
  });
};
module.exports = { logger, accessTransport };
