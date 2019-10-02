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
    ],
    launchDate: new Date(),
    stops: [{}]
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
              "_id": "5d93f29505a70ab4077b65ab",
              "activity1": "Tower of Pisa",
              "activity2": "The Vatican",
              "activity3": "Tower of Pizza",
            },
          ],
          "launchDate": "2019-10-02T00:43:01.267Z",
          "stops": Array [
            Object {
              "_id": "5d93f29505a70ab4077b65ac",
            },
          ],
          "title": "italy trip",
        }
      `
      );
    });
  });
});
