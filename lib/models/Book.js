const pool = require('../utils/pool');

module.exports = class Book {
  book_id;
  title;
  released;

  constructor(row) {
    this.book_id = row.book_id;
    this.title = row.title;
    this.released = row.released;
  }

  static async insert({ title, released }) {
    const { rows } = await pool.query(
      `
              INSERT INTO
                books ( title, released)
            VALUES
                ($1, $2)
            RETURNING
                *
                `,
      [title, released]
    );
    return new Book(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
            SELECT *
            FROM books
            `
    );
    return rows.map((row) => new Book(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        books
      WHERE
        book_id=$1
      `,
      [id]
    );

    return new Book(rows[0]);
  }

  async getAuthor() {
    const { rows } = await pool.query(
      `
      SELECT
        authors.author_id,
        authors.name
      FROM
        authors
      LEFT JOIN
        authors_books
      ON
        authors_books.author_id = authors.author_id
      WHERE
        authors_books.book_id=$1
      `,
      [this.book_id]
    );
    this.authors = rows;
    return this;
  }

  async getReviews() {
    const { rows } = await pool.query(
      `
      SELECT
        reviews.review_id,
        reviews.rating,
        reviews.review,
        reviewers
      FROM
        reviews
      LEFT JOIN
        reviewers
      ON
        reviews.reviewer_id = reviewers.reviewer_id
      WHERE
        reviews.book_id=$1
      `,
      [this.book_id]
    );
    this.reviews = rows;
    return this;
  }
};
