const { Router } = require('express');
const Reviewer = require('../models/Reviewer');
const pool = require('../utils/pool');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const reviewer = await Reviewer.insert(req.body);
    res.send(reviewer);

  } catch (error) {
    error.status = 404;
    next(error);
  }
});
