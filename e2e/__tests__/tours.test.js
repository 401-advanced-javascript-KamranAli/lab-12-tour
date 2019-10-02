jest.mock('../../lib/services/maps-api');
jest.mock('../../lib/services/weather-api');
require('dotenv').config();
const request = require('../request');
const db = require('../db');
const { matchMongoId } = require('../match-helpers');
const getLocation = require('../../lib/services/maps-api');
const getForecast = require('../../lib/services/weather-api');

getForecast.mockResolvedValue([
  {
    time: new Date('2019-10-02T09:00:00.000Z'),
    forecast: 'Partly cloudy throughout the day.'
  }
]);

getLocation.mockResolvedValue({
  latitude: 38,
  longitude: -130
});

describe('locations api', () => {
  beforeEach(() => {
    return db.dropCollection('locations');
  });
  const firstTours = {
    title: 'italy trip',
    activities: [
      {
        activity1: 'Tower of Pisa',
        activity2: 'The Vatican',
        activity3: 'Tower of Pizza'
      }
    ],
    stops: []
  };

  function postTours(tours) {
    return request
      .post('/api/tours')
      .send(tours)
      .expect(200)
      .then(({ body }) => body);
  }

  it('add a tours, gets geo tours', () => {
    return postTours(firstTours).then(tour => {
      expect(tour).toMatchInlineSnapshot(
        matchMongoId,

        `
        Object {
          "__v": 0,
          "_id": StringMatching /\\^\\[a-f\\\\d\\]\\{24\\}\\$/i,
          "activities": Array [
            Object {
              "_id": "5d952fe3b27d91ea6dbe9aed",
              "activity1": "Tower of Pisa",
              "activity2": "The Vatican",
              "activity3": "Tower of Pizza",
            },
          ],
          "launchDate": "2019-10-02T23:16:50.837Z",
          "stops": Array [],
          "title": "italy trip",
        }
      `
      );
    });
  });

  const stop1 = { address: '97008' };

  function postTourWithStop(tour, stop) {
    return postTours(tour).then(tour => {
      return request
        .post(`/api/tours/${tour._id}/stops`)
        .send(stop)
        .expect(200)
        .then(({ body }) => [tour, body]);
    });
  }

  it('adds a stop to the tour', () => {
    return postTourWithStop(firstTours, stop1).then(([, stops]) => {
      expect(stops[0]).toMatchInlineSnapshot(
        matchMongoId,

        `
        Object {
          "_id": StringMatching /\\^\\[a-f\\\\d\\]\\{24\\}\\$/i,
          "location": Object {
            "latitude": 38,
            "longitude": -130,
          },
          "weather": Object {
            "forecast": "Partly cloudy throughout the day.",
            "time": "2019-10-02T09:00:00.000Z",
          },
        }
      `
      );
    });
  });
});
