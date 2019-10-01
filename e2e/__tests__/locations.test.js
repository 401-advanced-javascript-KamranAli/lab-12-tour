const request = require('../request');
const db = require('../db');
// const getLocation = require('../../lib/services/map-api');
const { matchMongoId } = require('../match-helpers');


describe('locations api', () => {
  beforeEach(() => {
    return db.dropCollection('locations');
  });

  const firstLocation = {
    name: 'beaverton',
    address: '97008'
  };

  function postLocation(location) {
    return request
      .post('/api/locations')
      .send(location)
      .expect(200)
      .then(({ body }) => body);
  }

  it('add a location, gets geo location', () => {
    return postLocation(firstLocation).then(location => {
      expect(location).toMatchInlineSnapshot(
        matchMongoId,

      );
    });
  });
});