require("dotenv").config();
const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();
const { v4: uuidv4 } = require("uuid");
const myLogger = require("./loggers/mylogger.log");
// console.log(`Process`, process.env);
//* init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  const requestId = req.headers["x-request-id"];
  req.requestId = requestId ? requestId : uuidv4();
  myLogger.log(`input params ::${req.method}::`, [
    req.path,
    { requestId: req.requestId },
    req.method == "POST" ? req.body : req.query,
  ]);
  next();
});
//* init db
require("./dbs/init.mongodb.lv");
const { checkOverLoad } = require("./helpers/check.connect");
// checkOverLoad()
//*init routes
app.use("", require("./routes"));

//! handling err
app.use((req, res, next) => {
  const error = new Error("Not Dound");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  const resMessage = `${error.status} - ${
    Date.now() - error.now
  }ms - Response: ${JSON.stringify(error)}`;
  myLogger.error(resMessage, [
    req.path,
    { requestId: req.requestId },
    {
      message: error.message,
    },
  ]);
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    // stack: error.stack,
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
