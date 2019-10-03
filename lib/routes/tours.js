// eslint-disable-next-line new-cap
const router = require('express').Router();
const Tour = require('../models/tour');
const addGeo = require('../middleware/add-geolocation');
const addForecast = require('../middleware/add-forecast');

router
  .get('/', (req, res, next) => {
    Tour.find()
      .lean()
      .then(tours => res.json(tours))
      .catch(next);
  })

  .post('/', (req, res, next) => {
    Tour.create(req.body)
      .then(stop => {
        res.json(stop);
        Tour.findByIdAndUpdate(req.params.id);
      })
      .catch(next);
  })

  //stops routes
  .put('/:id', addGeo(), addForecast(), ({ params, body }, res, next) => {
    Tour.updateById(params.id, body)
      .then(tour => res.json(tour))
      .catch(next);
  })

  .post('/:id/stops', addGeo(), addForecast(), ({ params, body }, res, next) => {
    Tour.addStop(params.id, body, body.weather)
      .then(stops => res.json(stops))
      .catch(next);
  })


  .delete('/:id/stops/:stopId', ({ params }, res, next) => {
    Tour.removeStop(params.id, params.stopId)
      .then(stops => res.json(stops))
      .catch(next);
  })

  .put('/:id/stops/:stopId/tour', ({ params, body }, res, next) => {
    Tour.updateStopTour(params.id, params.stopId, body.tour)
      .then(stops => res.json(stops))
      .catch(next);
  });

module.exports = router;