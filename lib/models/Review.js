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

    const newObj = rows.map((row) => ({
      id: row.id,
      rating: row.rating,
      review: row.review,
      book_id: row.book_id,
      title: row.title,
    }));
    return new Review(newObj[0]);
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
        books.book_id = $1
      `,
      [this.book_id]
    );

    console.log('rows', rows)[this.book_title] = Object.values(rows[0]);

    return this;
  }
};
