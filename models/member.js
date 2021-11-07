const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: {
      type: String,
    },
    available: {
      type: Boolean,
      default: true,
    }
});

module.exports = mongoose.model('Member', memberSchema);