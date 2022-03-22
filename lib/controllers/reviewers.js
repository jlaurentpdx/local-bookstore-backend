const { Router } = require('express');
const { insert } = require('../models/Author');
const pool = require('../utils/pool');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    // const reviewer = await Reviewer.insert(req.body);
    // res.send(reviewer);
    const { name, company } = req.body;
    const { rows } = await pool.query(
      `
        INSERT INTO
            reviewers (name, company)
        VALUES
            ($1, $2)
        RETURNING
            *
        `,
      [name, company]
    );
    res.send(rows[0]);
  } catch (error) {
    error.status = 404;
    next(error);
  }
});
