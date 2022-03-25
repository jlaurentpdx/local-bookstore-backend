const pool = require('../utils/pool');

module.exports = class Author {
  author_id;
  name;
  dob;
  pob;

  constructor(row) {
    this.author_id = row.author_id;
    this.name = row.name;
    this.dob = new Date(row.dob).toLocaleDateString('en-US'); // TODO: Remove this from getAll
    this.pob = row.pob;
  }

  static async insert({ name, dob, pob }) {
    const { rows } = await pool.query(
      `
            INSERT INTO
                authors (name, dob, pob)
            VALUES
                ($1, $2, $3)
            RETURNING
                *
                `,
      [name, dob, pob]
    );
    return new Author(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
            SELECT *
            FROM authors
            `
    );
    return rows.map((row) => new Author(row));
  }

  static async getById(id) {
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

    return new Author(rows[0]);
  }

  async getBooks() {
    const { rows } = await pool.query(
      `
      SELECT
        books.book_id,
        books.title,
        books.released
      FROM
        books
      LEFT JOIN
        authors_books
      ON
        authors_books.book_id = books.book_id
      WHERE
        authors_books.author_id=$1
      `,
      [this.author_id]
    );

    this.books = rows;
    return this;
  }
};
