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
};
