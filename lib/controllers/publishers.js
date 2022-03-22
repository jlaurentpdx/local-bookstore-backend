const { Router } = require('express');
const Publisher = require('../models/Publisher');
module.exports = Router()
  .post('/', async (req, res) => {
    const publisher = await Publisher.insert(req.body);
    res.send(publisher);
  })

  .get('/', async (req, res, next) => {
    try {
      const publishers = await Publisher.getAll();
      res.send(publishers);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const publisher = await Publisher.getById(req.params.id);
      res.send(publisher);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
