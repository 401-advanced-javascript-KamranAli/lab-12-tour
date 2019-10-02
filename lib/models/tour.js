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
      time: Date,
      forecast: String
    },
    attendance: {
      type: Number,
      min: 1
    }
  }]
});

schema.statics = {
  addStop(id, body) {
    return this.updateById(
      id,
      {
        $push: {
          stops: [{
            location: body.location,
            weather: body.weather[0]
          }]

        }
      }
    )
      .then(tour => {
        return tour.stops;

      });
  }
};

module.exports = mongoose.model('Tour', schema);