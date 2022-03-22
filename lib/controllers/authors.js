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
  })
  .get('/:id', async (req, res) => {
    // const author = await Author.getById(req.params.id);
    // res.send(author);
    const id = req.params.id;

    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        authors
      WHERE
        author_id=$1
      `,
      [id]
    );

    res.send(rows[0]);
  });
