import express from "express";
import authRouter from "./modules/auth/auth.controller.js";
import userRouter from "./modules/user/user.controller.js";
import messageRouter from "./modules/message/message.controller.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/messages", messageRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
