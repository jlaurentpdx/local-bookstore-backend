const pool = require('../utils/pool');

module.exports = class Review {
  id;
  rating;
  review;

  constructor(row) {
    this.id = row.review_id;
    this.rating = row.rating;
    this.review = row.review;
  }

  static async insert({ rating, review }) {
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

    return new Review(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        reviews
      `
    );

    return rows.map((row) => new Review(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT 
        *
      FROM
        reviews
      WHERE
        review_id=$1
      `,
      [id]
    );

    return new Review(rows[0]);
  }
};
