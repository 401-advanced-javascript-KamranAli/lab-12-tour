// jest.mock('../../lib/services/maps-api');
const request = require('../request');
const db = require('../db');
const { matchMongoId } = require('../match-helpers');
// const getLocation = require('../../lib/services/maps-api');

// getLocation.mockResolvedValue({
//   latitude: 38,
//   longitude: -130
// });

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
    address: '97008'
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
              "_id": "5d9505af0dae18d9db08556d",
              "activity1": "Tower of Pisa",
              "activity2": "The Vatican",
              "activity3": "Tower of Pizza",
            },
          ],
          "address": 97008,
          "launchDate": "2019-10-02T20:16:47.749Z",
          "stops": Array [],
          "title": "italy trip",
        }
      `
      );
    });
  });

  // const stop1 = { title: 'Sicily' };

  // function postTourWithStop(tour, stop) {
  //   return postTours(tour).then(tour => {
  //     return request
  //       .post(`/api/tours/${tour._id}/stops`)
  //       .send(stop)
  //       .expect(200)
  //       .then(({ body }) => [tour, body]);
  //   });
  // }

//   it('adds a stop to the tour', () => {
//     return postTourWithStop(firstTours, stop1).then(([, stops]) => {
//       expect(stops[0]).toEqual({
//         ...matchMongoId,
//         ...stop1,
//         date: expect.any(String)
//       });
//     });
//   });
});
