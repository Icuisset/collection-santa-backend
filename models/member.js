const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  teamid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "team",
    required: true,
  },
  giftee: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("Member", memberSchema);
