// eslint-disable-next-line new-cap
const router = require('express').Router();
const Stop = require('../models/stop');

router
  .post('/', (req, res, next) => {
    Stop.create(req.body)
      .then(stop => res.json(stop))
      .catch(next);
  });

module.exports = router;