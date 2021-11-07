const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    teamname: {
      type: String,
    }
});

module.exports = mongoose.model('Team', teamSchema);