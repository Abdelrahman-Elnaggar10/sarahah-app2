import { userRepository } from "../../DB/repository/user.repository.js";
import { messageRepository } from "../../DB/repository/message.repository.js";
import { NotFoundException } from "../../common/exceptions/index.js";

export async function sendMessage(username, content) {
  const receiver = await userRepository.findByUsername(username);
  if (!receiver) throw new NotFoundException("User not found");
  await messageRepository.create({ receiver: receiver._id, content });
}

export const getInbox = (userId) => messageRepository.findForUser(userId);

export async function deleteMessage(id, userId) {
  const deleted = await messageRepository.deleteForUser(id, userId);
  if (!deleted) throw new NotFoundException("Message not found");
}
