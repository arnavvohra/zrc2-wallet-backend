require("winston-daily-rotate-file");
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("./config");
const MongoManager = require("./src/mongo");
const api = require("./src/api");
const expressWinston = require("express-winston");
const { accessTransport } = require("./config/winston");
const { format } = require("logform");
const { timestamp, combine, printf } = format;
const rTracer = require("cls-rtracer");
const app = express();

// Log Format is [Timestamp] [LEVEL] [REQUEST-ID] HOST - METHOD URL STATUS_CODE [USER_AGENT] RESPONSE_TIME
app.use(
  expressWinston.logger({
    transports: [accessTransport],
    format: combine(
      timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
      }),
      printf(info => {
        const rid = rTracer.id();
        let req = info.meta.req;
        let { method, url } = req;
        let { host } = req.headers;
        let { statusCode } = info.meta.res;
        let { responseTime } = info.meta;
        return `[${info.timestamp}] [${
          info.level
        }] [request-id:${rid}] ${host} - ${method} "${url}" ${statusCode} [${
          req.headers["user-agent"]
        }] ${responseTime}`;
      })
    ),
    level: "info"
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(rTracer.expressMiddleware());

// Add headers
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
// mongoManager.connect();

app.use("/api/v1", api(config));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
