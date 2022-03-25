const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

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
      const reviewerWithReviews = await reviewer.getReviews();
      res.send(reviewerWithReviews);
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
      const reviewer = await Reviewer.getById(req.params.id);
      const { count } = await reviewer.countReviews();

      if (count.length < 1) {
        // TODO: why is this not working correctly
        const deleteReviewer = await Reviewer.delete(req.params.id);
        res.send(deleteReviewer);
      }
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
