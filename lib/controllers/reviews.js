const { Router } = require('express');
const pool = require('../utils/pool');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    // const reviewer = await Review.insert(req.body);
    // res.send(reviewer);

    const { rating, review } = req.body;

    const { rows } = await pool.query(
      `
      INSERT INTO
          reviews (rating, review)
      VALUES
          ($1, $2)
      RETURNING
          *
      `,
      [rating, review]
    );

    res.send(rows[0]);
  } catch (error) {
    error.status = 404;
    next(error);
  }
});
