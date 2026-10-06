import { decrypt } from "../../common/utils/encryption.js";

const shareLink = (username) => `/messages/send/${username}`;

export const toPrivateUser = (user) => ({
  id: user._id,
  username: user.username,
  email: user.email,
  phone: decrypt(user.phone),
  shareLink: shareLink(user.username),
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const toPublicUser = (user) => ({
  id: user._id,
  username: user.username,
  shareLink: shareLink(user.username),
  createdAt: user.createdAt,
});
