import { BaseRepository } from "./base.repository.js";
import { Message } from "../models/Message.js";

class MessageRepository extends BaseRepository {
  constructor() {
    super(Message);
  }

  findForUser(userId) {
    return this.find({ receiver: userId }, null, { sort: { createdAt: -1 } });
  }

  deleteForUser(id, userId) {
    return this.deleteOne({ _id: id, receiver: userId });
  }

  deleteAllForUser(userId) {
    return this.deleteMany({ receiver: userId });
  }
}

export const messageRepository = new MessageRepository();
