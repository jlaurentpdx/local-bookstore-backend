const pool = require('../utils/pool');

module.exports = class Review {
  id;
  rating;
  review;
  book_id;
  book_title;

  constructor(row) {
    this.id = row.review_id;
    this.rating = row.rating;
    this.review = row.review;
    this.book_id = row.book_id;
    this.book_title = row.book_title;
  }

  static async insert({ rating, review, book_id }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
          reviews (rating, review, book_id)
      VALUES
          ($1, $2, $3)
      RETURNING
          *
      `,
      [rating, review, book_id]
    );

    return new Review(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT
        review_id,
        rating,
        review,
        books.book_id,
        title AS book_title
      FROM
        reviews
      INNER JOIN
        books
      ON
        reviews.book_id = books.book_id
      `
    );

    return rows.map((row) => new Review(row));
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        reviews
      WHERE
        review_id=$1
      RETURNING
        *
      `,
      [id]
    );

    return new Review(rows[0]);
  }

  async getTitle() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        books
      INNER JOIN
        reviews
      ON
        reviews.book_id = books.book_id
      WHERE 
        reviews.book_id = $1
      `,
      [this.book_id]
    );

    [this.book_title] = Object.values(rows[0]);
    return this;
  }
};
