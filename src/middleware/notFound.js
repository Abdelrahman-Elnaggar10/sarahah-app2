import { NotFoundException } from "../common/exceptions/index.js";

export const notFound = (req, res, next) =>
  next(new NotFoundException(`Route ${req.method} ${req.originalUrl} not found`));
