const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true
    },
    rbx: {
      type: Number,
      lowercase: true,
      default: 0.5
    },
    refered_by: { type: String, lowercase: true }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = User = mongoose.model("User", UserSchema);
