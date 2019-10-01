const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  location: {
    type: ObjectId,
    ref: 'Location',
    required: true
  },
  weather: {
    day: new Date(),
    forecast: String
  },
  attendance: {
    type: Number,
    required: false
  }
});

module.exports = mongoose.model('Stop', schema);