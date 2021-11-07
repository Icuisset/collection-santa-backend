const mongoose = require('mongoose');

const santapairSchema = new mongoose.Schema({
    santagive: {
      type: String,
    },
    santareceive: {
      type: String,
    }

});

module.exports = mongoose.model('Santa', santapairSchema);