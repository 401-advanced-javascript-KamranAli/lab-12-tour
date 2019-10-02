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
  .post('/:id/stops', addGeo(), addForecast(), ({ params, body }, res, next) => {
    Tour.addStop(params.id, body)
      .then(stops => res.json(stops))
      .catch(next);
  });

  

module.exports = router;