const { Router } = require('express');
const Reviewer = require('../models/Reviewer');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const reviewer = await Reviewer.insert(req.body);
      res.send(reviewer);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const reviewers = await Reviewer.getAll();
      res.send(reviewers);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      //   const reviewer = await Reviewer.getById(req.params.id);
      //   res.send(reviewer);
      const id = req.params.id;
      const { rows } = await pool.query(
        `
        SELECT *
        FROM reviewers
        WHERE reviewer_id = $1
        `,
        [id]
      );
      res.send(rows[0]);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
