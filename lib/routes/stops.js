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

  .post('/:id', addGeo(), addForecast(), (req, res, next) => {
    Tour.create(req.body)
      .then(stop => {
        res.json(stop);
        Tour.findByIdAndUpdate(req.params.id)
          .then(updatedTour => {
            console.log(updatedTour);
          });
      })
      .catch(next);
  });

// .get('/:id', (req, res, next) => {
//   Tour.findById(req.params.id)
//     .populate('tours', 'stops')
//     .then(stop => res.json(stop))
//     .catch(next);
// })

// .put('/:id', addGeo(), ({ params, body }, res, next) =>{
//   Tour.updateById(params.id, body)
//     .then(tour => res.json(tour))
//     .catch(next);
// });

module.exports = router;