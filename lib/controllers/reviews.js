const { Router } = require('express');
const Review = require('../models/Review');
const pool = require('../utils/pool');

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

  .get('/:id', async (req, res, next) => {
    try {
      const reviews = await Review.getById(req.params.id);
      res.send(reviews);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });