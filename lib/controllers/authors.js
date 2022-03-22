const { Router } = require('express');
const pool = require('../utils/pool');
// const Authors = require('../models/Authors');
module.exports = Router().post('/', async (req, res) => {
  //   const author = await Author.insert(req.body);
  //   res.send(author);
  const { name, dob, pob } = req.body;
  const { rows } = await pool.query(
    `
      INSERT INTO
        authors (name, dob, pob)
    VALUES
        ($1, $2, $3)
    RETURNING
        *
        `,
    [name, '1949-01-12T08:00:00.000Z', pob]
  );
  res.send(rows[0]);
});
