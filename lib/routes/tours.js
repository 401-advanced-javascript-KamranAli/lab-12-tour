// eslint-disable-next-line new-cap
const router = require('express').Router();
const Tour = require('../models/tour');

router
  .get('/', (req, res, next) => {
    Tour.find()
      .lean()
      .then(tours => res.json(tours))
      .catch(next);
  })

  .post('/', (req, res, next) => {
    Tour.create(req.body)
      .then(tour => res.json(tour))
      .catch(next);
  });

module.exports = router;