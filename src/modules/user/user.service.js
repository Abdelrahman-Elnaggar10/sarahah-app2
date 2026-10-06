import { userRepository } from "../../DB/repository/user.repository.js";
import { messageRepository } from "../../DB/repository/message.repository.js";
import { encrypt } from "../../common/utils/encryption.js";
import { ConflictException, NotFoundException } from "../../common/exceptions/index.js";
import { toPrivateUser, toPublicUser } from "./user.mapper.js";

export async function getProfile(userId) {
  const user = await userRepository.findById(userId);
  if (!user) throw new NotFoundException("User not found");
  return toPrivateUser(user);
}

export async function updateProfile(userId, { username, email, phone }) {
  const update = {};

  if (username) {
    const taken = await userRepository.findOne({ username, _id: { $ne: userId } });
    if (taken) throw new ConflictException("Username already taken");
    update.username = username;
  }

  if (email) {
    const taken = await userRepository.findOne({ email, _id: { $ne: userId } });
    if (taken) throw new ConflictException("Email already registered");
    update.email = email;
  }

  if (phone) update.phone = encrypt(phone);

  const user = await userRepository.updateById(userId, update);
  if (!user) throw new NotFoundException("User not found");
  return toPrivateUser(user);
}

export async function deleteProfile(userId) {
  const user = await userRepository.deleteById(userId);
  if (!user) throw new NotFoundException("User not found");
  await messageRepository.deleteAllForUser(userId); 
}

export async function getAllUsers({ page, limit }) {
  const [users, total] = await Promise.all([
    userRepository.findPage({ page, limit }),
    userRepository.count(),
  ]);
  return { page, limit, total, users: users.map(toPublicUser) };
}
