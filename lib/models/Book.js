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
                books (title, released)
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
    const newObj = rows.map((row) => ({
      book_id: row.book_id,
      title: row.title,
      released: row.released,
      publisher: { publisher_id: row.publisher_id },
    }));
    return new Book(newObj[0]);
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

  async getPublisher() {
    const { rows } = await pool.query(
      `
      SELECT
        publishers.publisher_id
      FROM
        publishers
      LEFT JOIN
        books
      ON
        publishers.publisher_id = books.publisher_id
      WHERE
        books.book_id=$1
      `,
      [this.book_id]
    );
    [this.publisher] = rows;
    return this;
  }
  async getReviews() {
    const { rows } = await pool.query(
      `
      SELECT
        reviews.review_id,
        reviews.rating,
        reviews.review,
        reviewers.reviewer_id,
        reviewers.name
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
    const updatedReviews = rows.map((row) => ({
      review_id: row.review_id,
      rating: row.rating,
      review: row.review,
      reviewer: { reviewer_id: row.review_id, name: row.name },
    }));
    this.reviews = updatedReviews;
    return this;
  }
};
