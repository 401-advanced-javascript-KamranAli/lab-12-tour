const getForecast = require('../services/maps-api');

module.exports = () => (req, res, next) => {
  const { location } = req.body;

  if(!location) {
    return next({
      statusCode: 400,
      error: 'location must be supplied'
    });
  }

  getForecast(location.latitude, location.longitude)
    .then(forecast => {

      req.body.weather = forecast;
      next();
    })
    .catch (next);
};