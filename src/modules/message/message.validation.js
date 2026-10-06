import { z } from "zod";
import { usernameField, objectIdField } from "../../common/validation/fields.js";

export const sendMessageParams = z.object({ username: usernameField });

export const sendMessageBody = z.strictObject({
  content: z
    .string({ error: "Message content is required" })
    .trim()
    .min(1, "Message cannot be empty")
    .max(500, "Message is too long (500 characters max)"),
});

export const messageIdParams = z.object({ id: objectIdField });
