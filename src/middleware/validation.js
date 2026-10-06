import { ValidationException } from "../common/exceptions/index.js";


export const validate = (schemas) => (req, res, next) => {
  const errors = [];

  for (const location of ["params", "query", "body"]) {
    const schema = schemas[location];
    if (!schema) continue;

    const result = schema.safeParse(req[location] ?? {});

    if (result.success) {
      req[location] = result.data; // cleaned data (trimmed, coerced, unknown keys stripped)
    } else {
      for (const issue of result.error.issues) {
        errors.push({
          location,
          field: issue.path.join(".") || "(root)",
          message: issue.message,
        });
      }
    }
  }

  if (errors.length) return next(new ValidationException(errors));
  next();
};
