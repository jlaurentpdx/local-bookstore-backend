const { Router } = require('express');
const pool = require('../utils/pool');
const Author = require('../models/Author');

module.exports = Router()
  .post('/', async (req, res) => {
    const author = await Author.insert(req.body);
    res.send(author);
  })
  .get('/', async (req, res) => {
    const authors = await Author.getAll();
    res.send(authors);
  });