const { Router } = require('express');
const pool = require('../utils/pool');
const Author = require('../models/Author');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const author = await Author.insert(req.body);
      res.send(author);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const authors = await Author.getAll();
      res.send(authors);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const author = await Author.getById(req.params.id);
      res.send(author);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
