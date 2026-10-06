import { AppException } from "../common/exceptions/index.js";
import { config } from "../config/config.js";

export function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let message = "Something went wrong";
  let details;

  if (err instanceof AppException) {
    statusCode = err.statusCode;
    message = err.message;
    details = err.details;
  } else if (err.type === "entity.parse.failed") {
    statusCode = 400;
    message = "Invalid JSON body";
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid value for "${err.path}"`;
  } else if (err.name === "ValidationError" && err.errors) {
    statusCode = 400;
    message = "Database validation failed";
    details = Object.values(err.errors).map((e) => ({ field: e.path, message: e.message }));
  } else if (err.code === 11000) {
    statusCode = 409;
    message = `${Object.keys(err.keyPattern || {})[0] || "value"} already exists`;
  }

  if (statusCode === 500) console.error(err);

  res.status(statusCode).json({
    success: false,
    message,
    ...(details && { details }),
    ...(config.nodeEnv === "development" && statusCode === 500 && { stack: err.stack }),
  });
}
