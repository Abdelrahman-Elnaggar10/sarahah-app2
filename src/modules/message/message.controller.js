import { Router } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler.js";
import { validate } from "../../middleware/validation.js";
import { simpleAuth } from "../../middleware/simpleAuth.js";
import { sendMessageParams, sendMessageBody, messageIdParams } from "./message.validation.js";
import * as messageService from "./message.service.js";

const router = Router();

router.post(
  "/send/:username",
  validate({ params: sendMessageParams, body: sendMessageBody }),
  asyncHandler(async (req, res) => {
    await messageService.sendMessage(req.params.username, req.body.content);
    res.status(201).json({ success: true, message: "Message sent" });
  })
);

router.get(
  "/inbox",
  simpleAuth,
  asyncHandler(async (req, res) => {
    const data = await messageService.getInbox(req.userId);
    res.json({ success: true, data });
  })
);

router.delete(
  "/:id",
  simpleAuth,
  validate({ params: messageIdParams }),
  asyncHandler(async (req, res) => {
    await messageService.deleteMessage(req.params.id, req.userId);
    res.json({ success: true, message: "Message deleted" });
  })
);

export default router;
