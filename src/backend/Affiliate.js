const mongoose = require("mongoose");

const AffiliateSchema = new mongoose.Schema(
  {
    click_id: {
      type: String,
      lowercase: true,
      unique: true
    },
    is_finished: {
      type: Boolean,
      default: false
    },
    username: { type: String, lowercase: true }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = User = mongoose.model("Affiliate", AffiliateSchema);
