const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: {
      type: String,
    },
    available: {
      type: Boolean,
      default: true,
    },
    team: {
      type: String,
    }
});

module.exports = mongoose.model('Member', memberSchema);