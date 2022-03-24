const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const book = await Book.insert(req.body);
      res.send(book);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const books = await Book.getAll();
      res.send(books);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const book = await Book.getById(req.params.id);
      const bookwithAuthor = await book.getAuthor();
      const bookwithReview = await bookwithAuthor.getReviews();
      res.send(bookwithReview);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
