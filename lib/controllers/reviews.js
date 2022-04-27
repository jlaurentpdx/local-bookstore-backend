const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const review = await Review.insert(req.body);
      res.send(review);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const reviews = await Review.getAll();
      res.send(reviews);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const reviews = await Review.delete(req.params.id);
      res.send(reviews);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
