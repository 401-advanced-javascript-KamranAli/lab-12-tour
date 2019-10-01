const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString } = require('./required-types');

const schema = new Schema({
  title: RequiredString,
  activities: [{
    activity1: RequiredString,
    activity2: RequiredString,
    activity3: RequiredString
  }],
  launchDate: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Location', schema);