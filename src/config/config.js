import dotenv from "dotenv";
import path from "node:path";


const nodeEnv = process.env.NODE_ENV || "development";
dotenv.config({ path: path.resolve(process.cwd(), `.env.${nodeEnv}`) });

// All env access in the app goes through this file only.
const required = ["MONGO_URI", "ENCRYPTION_KEY"];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  throw new Error(`Missing environment variables: ${missing.join(", ")}`);
}

if (!/^[0-9a-fA-F]{64}$/.test(process.env.ENCRYPTION_KEY)) {
  throw new Error("ENCRYPTION_KEY must be 64 hex characters (32 bytes)");
}

export const config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGO_URI,
  encryptionKey: process.env.ENCRYPTION_KEY,
};
