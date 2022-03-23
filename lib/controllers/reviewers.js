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
      const reviewer = await Reviewer.getById(req.params.id);
      res.send(reviewer);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const reviewer = await Reviewer.update(req.params.id, req.body);
      res.send(reviewer);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      // const reviewer = await Reviewer.delete(req.params.id);
      // res.send(reviewer);

      const id = req.params.id;

      const { rows } = await pool.query(
        `
          DELETE FROM 
            reviewers
          WHERE 
            reviewer_id=$1
          RETURNING
            *
          `,
        [id]
      );

      res.send(rows[0]);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
