import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      set: (v) => (typeof v === "string" ? v.trim() : v),
      validate: {                                          
        validator: (v) => /^[a-z0-9_]{3,20}$/.test(v),
        message: "Username must be English letters/numbers/underscore, 3 to 20 characters",
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (v) => /^\S+@\S+\.\S+$/.test(v),
        message: "Invalid email",
      },
    },
   
    phone: { type: String, required: [true, "Phone is required"] },
    password: { type: String, required: [true, "Password is required"], select: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


userSchema.virtual("shareLink").get(function () {
  return `/messages/send/${this.username}`;
});

export const User = mongoose.model("User", userSchema);
