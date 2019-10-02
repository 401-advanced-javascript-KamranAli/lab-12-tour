const request = require('../request');
const db = require('../db');

describe('stops api', () => {
  beforeEach(() => {
    return Promise.all([
      db.dropCollection('stops'),
      db.dropCollection('tours')
    ]);
  });

  const firstTours = {
    title: 'italy trip',
    activities: [
      {
        activity1: 'Tower of Pisa',
        activity2: 'The Vatican',
        activity3: 'Tower of Pizza'
      }
    ]
  };

  const testStop = [{}];

  function postStop(stops) {
    return request
      .post('/api/stops')
      .send(firstTours)
      .expect(200)
      .then(({ body }) => {
        stops[0] = body._id;
        return request
          .post('/api/stops')
          .send(testStop)
          .expect(200);
      })
      .then(({ body }) => body);
  }

  it('posts a stop ', () => {
    return postStop(testStop).then(stop => {
      expect(stop).toMatchInlineSnapshot(
        {
          _id: expect.any(String),
          stops: [expect.any(Object)]
        },

      );
    });
  });

});
