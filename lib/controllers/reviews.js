const { Router } = require('express');
const Review = require('../models/Review');
const pool = require('../utils/pool');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const reviewer = await Review.insert(req.body);
    res.send(reviewer);
  } catch (error) {
    error.status = 404;
    next(error);
  }
});
