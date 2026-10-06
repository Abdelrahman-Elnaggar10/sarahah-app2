import { Router } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler.js";
import { validate } from "../../middleware/validation.js";
import { simpleAuth } from "../../middleware/simpleAuth.js";
import { getAllUsersQuery, updateProfileSchema } from "./user.validation.js";
import * as userService from "./user.service.js";

const router = Router();

router.use(simpleAuth);

router.get(
  "/",
  validate({ query: getAllUsersQuery }),
  asyncHandler(async (req, res) => {
    const data = await userService.getAllUsers(req.query);
    res.json({ success: true, data });
  })
);

router.get(
  "/profile",
  asyncHandler(async (req, res) => {
    const data = await userService.getProfile(req.userId);
    res.json({ success: true, data });
  })
);

router.patch(
  "/profile",
  validate({ body: updateProfileSchema }),
  asyncHandler(async (req, res) => {
    const data = await userService.updateProfile(req.userId, req.body);
    res.json({ success: true, message: "Profile updated", data });
  })
);

router.delete(
  "/profile",
  asyncHandler(async (req, res) => {
    await userService.deleteProfile(req.userId);
    res.json({ success: true, message: "Profile deleted" });
  })
);

export default router;
