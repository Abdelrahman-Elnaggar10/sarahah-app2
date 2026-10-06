import { z } from "zod";
import { OBJECT_ID_REGEX } from "../common/validation/fields.js";
import { UnauthorizedException } from "../common/exceptions/index.js";
import { asyncHandler } from "../common/utils/asyncHandler.js";
import { userRepository } from "../DB/repository/user.repository.js";

const objectIdSchema = z.string().regex(OBJECT_ID_REGEX);

export const simpleAuth = asyncHandler(async (req, res, next) => {
  const parsed = objectIdSchema.safeParse(req.header("x-user-id"));
  if (!parsed.success) throw new UnauthorizedException("You must log in first (valid x-user-id header)");

  const user = await userRepository.findById(parsed.data);
  if (!user) throw new UnauthorizedException("User no longer exists");

  req.user = user;
  req.userId = user._id;
  next();
});
