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
      // const reviewer = await Reviewer.update(req.params.id, req.body);
      // res.send(reviewer);

      const attributes = req.body;
      const id = req.params.id;

      const existingReviewer = await Reviewer.getById(id);
      const updateReviewer = { ...existingReviewer, ...attributes };

      const { name, company } = updateReviewer;

      const { rows } = await pool.query(
        `
        UPDATE 
          reviewers
        SET 
          name=$1,
          company=$2
        WHERE
          reviewer_id=$3
        RETURNING 
          *
        `,
        [name, company, id]
      );

      res.send(rows[0]);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
