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
  },
  stops: [{
    location: {
      longitude: Number,
      latitude: Number
    },
    weather: {
      day: Date,
      forecast: String
    },
    attendance: {
      type: Number,
      min: 1
    }
  }]
});

schema.statics = {
  addStop(id, stop) {
    return this.updateById(
      id,
      {
        $push: {
          stops: stop
        }
      }
    )
      .then(tour => tour.stops);
  }
};

module.exports = mongoose.model('Tour', schema);