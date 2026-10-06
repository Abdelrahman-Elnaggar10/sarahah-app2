import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    content: {
      type: String,
      required: [true, "Message cannot be empty"],
      trim: true,
      maxlength: [500, "Message is too long"],
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
