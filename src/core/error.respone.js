const { StatusCodes, ReasonPhrases } = require("../utils/httpStatusCode");
const mylogger = require("../loggers/mylogger.log");
// const logger = require("../loggers/winston.log");
const StatusCode = {
  FORBIDDEN: 403,
  CONFLICT: 409,
};

const ReasonStatusCode = {
  FORBIDDEN: "Bad request error",
  CONFLICT: "Conflict error",
};

class ErrorRespone extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    //TODO
    // Log error use winston
    // logger.error(`${this.status} - ${this.message}`);
    mylogger.error(this.message, [
      "/api/v1/login",
      "vv3344",
      { error: "Bad request error" },
    ]);
  }
}

class ConflictRequestError extends ErrorRespone {
  constructor(
    message = ReasonStatusCode.CONFLICT,
    statusCode = StatusCode.FORBIDDEN
  ) {
    super(message, statusCode);
  }
}

class BadRequestError extends ErrorRespone {
  constructor(
    message = ReasonStatusCode.CONFLICT,
    statusCode = StatusCode.FORBIDDEN
  ) {
    super(message, statusCode);
  }
}

class AuthFailureError extends ErrorRespone {
  constructor(
    message = ReasonPhrases.UNAUTHORIZED,
    statusCode = StatusCodes.UNAUTHORIZED
  ) {
    super(message, statusCode);
  }
}
class NotFoundError extends ErrorRespone {
  constructor(
    message = ReasonPhrases.NOT_FOUND,
    statusCode = StatusCodes.NOT_FOUND
  ) {
    super(message, statusCode);
  }
}
class ForbiddenError extends ErrorRespone {
  constructor(
    message = ReasonPhrases.FORBIDDEN,
    statusCode = StatusCodes.FORBIDDEN
  ) {
    super(message, statusCode);
  }
}
module.exports = {
  ConflictRequestError,
  BadRequestError,
  NotFoundError,
  AuthFailureError,
  ForbiddenError,
};
