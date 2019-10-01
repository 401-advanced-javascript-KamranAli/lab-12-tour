const Location = require('../tour');

describe('location model', () => {

  it('validates locations model', () => {
    const data = {
      title: 'italy trip',
      activities: [{
        activity1: 'Tower of Pisa',
        activity2: 'The Vatican',
        activity3: 'Tower of Pizza'
      }],
      launchDate: new Date()
    };

    const location = new Location(data);
    const errors = location.validateSync();
    expect(errors).toBeUndefined();

    const json = location.toJSON();
    expect(json).toEqual({
      title: 'italy trip',
      _id: expect.any(Object),
      activities: [{
        _id: expect.any(Object),
        activity1: 'Tower of Pisa',
        activity2: 'The Vatican',
        activity3: 'Tower of Pizza'
      }],
      launchDate: expect.any(Object)
    });
  });
  

  it('validates required fields', () => {
    const data = {};
    const location = new Location(data);
    const { errors } = location.validateSync();
    expect(errors.title.kind).toBe('required');

  });
});