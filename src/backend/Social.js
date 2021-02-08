const mongoose = require("mongoose");

const SocialSchema = new mongoose.Schema({
  social_type: String,
  users_earned: Array,
  rbx: Number
});

module.exports = Social = mongoose.model("Social", SocialSchema);
