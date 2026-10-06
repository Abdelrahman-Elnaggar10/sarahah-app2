import { Router } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler.js";
import { validate } from "../../middleware/validation.js";
import { loginSchema, signupSchema } from "./auth.validation.js";
import * as authService from "./auth.service.js";

const router = Router();

router.post(
  "/register",
  validate({ body: signupSchema }),
  asyncHandler(async (req, res) => {
    const user = await authService.register(req.body);
    res.status(201).json({ success: true, message: "Account created", data: user });
  })
);

router.post(
  "/login",
  validate({ body: loginSchema }),
  asyncHandler(async (req, res) => {
    const data = await authService.login(req.body);
    res.json({ success: true, message: "Logged in", data });
  })
);

export default router;
