// eslint-disable-next-line new-cap
const router = require('express').Router();
const Location = require('../models/tour');
// const addGeo = require('../middleware/add-geolocation');

router
  .get('/', (req, res, next) => {
    Location.find()
      .lean()
      .then(locations => res.json(locations))
      .catch(next);
  });

module.exports = router;