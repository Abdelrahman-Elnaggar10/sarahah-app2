export class AppException extends Error {
  constructor(message, statusCode = 500, details = undefined) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;
  }
}

export class BadRequestException extends AppException {
  constructor(message = "Bad request", details) {
    super(message, 400, details);
  }
}

export class ValidationException extends AppException {
  constructor(details, message = "Validation failed") {
    super(message, 422, details);
  }
}

export class UnauthorizedException extends AppException {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class ForbiddenException extends AppException {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

export class NotFoundException extends AppException {
  constructor(message = "Not found") {
    super(message, 404);
  }
}

export class ConflictException extends AppException {
  constructor(message = "Conflict") {
    super(message, 409);
  }
}
