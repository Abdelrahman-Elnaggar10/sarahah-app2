import { userRepository } from "../../DB/repository/user.repository.js";
import { hashPassword, verifyPassword } from "../../common/utils/hash.js";
import { encrypt } from "../../common/utils/encryption.js";
import { ConflictException, UnauthorizedException } from "../../common/exceptions/index.js";
import { toPrivateUser } from "../user/user.mapper.js";

export async function register({ username, email, phone, password }) {
  const existing = await userRepository.findByUsernameOrEmail(username, email);
  if (existing) {
    throw new ConflictException(
      existing.username === username ? "Username already taken" : "Email already registered"
    );
  }

  const user = await userRepository.create({
    username,
    email,
    phone: encrypt(phone),
    password: await hashPassword(password),
  });

  return toPrivateUser(user);
}

export async function login({ username, password }) {
  const user = await userRepository.findByUsernameWithPassword(username);
  if (!user || !(await verifyPassword(user.password, password))) {
    throw new UnauthorizedException("Invalid credentials");
  }
  return { userId: user._id, username: user.username };
}
