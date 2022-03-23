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
      // const reviews = await Review.getAll();
      // res.send(reviews);

      const { rows } = await pool.query(
        `
        SELECT
          *
        FROM
          reviews
        `
      );

      res.send(rows);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
