const request = require('../request');
const db = require('../db');
const { matchMongoId } = require('../match-helpers');
// const getLocation = require('../../lib/services/map-api');

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
    ]
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
              "_id": "5d94d2363580e2c5baf569b5",
              "activity1": "Tower of Pisa",
              "activity2": "The Vatican",
              "activity3": "Tower of Pizza",
            },
          ],
          "launchDate": "2019-10-02T16:37:10.427Z",
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
