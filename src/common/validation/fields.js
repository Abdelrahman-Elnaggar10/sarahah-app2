import { z } from "zod";

export const USERNAME_REGEX = /^[a-z0-9_]{3,20}$/;         
export const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
export const EGYPT_PHONE_REGEX = /^01[0125][0-9]{8}$/;       
export const OBJECT_ID_REGEX = /^[a-f\d]{24}$/i;


export const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

const requiredString = (label) =>
  z.string({
    error: (issue) =>
      issue.input === undefined ? `${label} is required` : `${label} must be a string`,
  });

export const usernameField = requiredString("Username")
  .trim()
  .toLowerCase()
  .regex(USERNAME_REGEX, "Username must be 3-20 characters: English letters, numbers or underscore only");

export const emailField = requiredString("Email")
  .trim()
  .toLowerCase()
  .regex(EMAIL_REGEX, "Email format is invalid");

export const phoneField = requiredString("Phone")
  .trim()
  .regex(EGYPT_PHONE_REGEX, "Phone must be a valid Egyptian mobile number (e.g. 01012345678)");

export const passwordField = requiredString("Password").regex(
  STRONG_PASSWORD_REGEX,
  "Password must be 8+ characters with uppercase, lowercase, a number and a special character"
);

export const objectIdField = requiredString("Id").regex(OBJECT_ID_REGEX, "Id is not a valid ObjectId");
