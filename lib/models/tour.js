const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString } = require('./required-types');

const schema = new Schema({
  title: RequiredString,
  activities: [
    RequiredString,
    RequiredString,
    RequiredString
  ],
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
  },

  removeStop(id, stopId) {
    return this.updateById(id, {
      $pull: {
        stops: { _id: stopId }
      }
    })
      .then(tour => tour.stops);
  },

  updateTourStop(id, stopId, tour) {
    return this.updateOne(
      { _id: id, 'stops._id': stopId },
      {
        $set: {
          'stops.$.tour': tour
        }
      }
    )
      .then(tour => tour.stops);
  }

};

module.exports = mongoose.model('Tour', schema);