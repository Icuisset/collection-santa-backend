const mongoose = require("mongoose");
const validator = require("validator");

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
  message: {
    type: String,
    default: null,
  },
  avatar: {
    type: String,
    default: null,
    validate: {
      validator: (v) => validator.isURL(v, { protocols: ["http", "https"] }),
      message: "Please enter a valid URL address",
    },
  },
});

module.exports = mongoose.model("Member", memberSchema);
