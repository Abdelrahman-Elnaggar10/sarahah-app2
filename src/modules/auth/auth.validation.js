import { z } from "zod";
import {
  usernameField,
  emailField,
  phoneField,
  passwordField,
} from "../../common/validation/fields.js";


export const loginSchema = z.strictObject({
  username: usernameField,
  password: z.string({ error: "Password is required" }).min(1, "Password is required"),
});

export const signupSchema = z
  .strictObject({
    username: usernameField,
    email: emailField,
    phone: phoneField,
    password: passwordField,
    confirmPassword: z.string({ error: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => !data.password?.toLowerCase().includes(data.username ?? "\u0000"), {
    error: "Password must not contain the username",
    path: ["password"],
  });
