import { z } from "zod";
import { usernameField, emailField, phoneField } from "../../common/validation/fields.js";


export const getAllUsersQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

export const updateProfileSchema = z
  .strictObject({
    username: usernameField,
    email: emailField,
    phone: phoneField,
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    error: "Send at least one field to update (username, email or phone)",
  });
