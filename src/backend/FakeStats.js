const mongoose = require("mongoose");

const FakeStatsSchema = new mongoose.Schema({
  online_users: {
    Type: Number
  }
});

module.exports = FakeStats = mongoose.model("FakeStats", FakeStatsSchema);