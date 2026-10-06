import { BaseRepository } from "./base.repository.js";
import { User } from "../models/User.js";

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  findByUsername(username) {
    return this.findOne({ username });
  }

  findByUsernameWithPassword(username) {
    return this.findOne({ username }).select("+password");
  }

  findByUsernameOrEmail(username, email) {
    return this.findOne({ $or: [{ username }, { email }] });
  }

  findPage({ page, limit }) {
    return this.find({}, null, { sort: { createdAt: -1 }, skip: (page - 1) * limit, limit });
  }
}

export const userRepository = new UserRepository();
