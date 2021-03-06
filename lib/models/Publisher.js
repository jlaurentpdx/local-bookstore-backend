const pool = require('../utils/pool');

module.exports = class Publisher {
  id;
  name;
  city;
  state;
  country;

  constructor(row) {
    this.publisher_id = row.publisher_id;
    this.name = row.name;
    this.city = row.city;
    this.state = row.state;
    this.country = row.country;
  }

  static async insert({ name, city, state, country }) {
    const { rows } = await pool.query(
      `
              INSERT INTO
                publishers (name, city, state, country)
            VALUES
                ($1, $2, $3, $4)
            RETURNING
                *
                `,
      [name, city, state, country]
    );
    return new Publisher(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
            SELECT *
            FROM publishers
            `
    );
    return rows.map((row) => new Publisher(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        publishers
      WHERE
        publisher_id=$1
      `,
      [id]
    );

    return new Publisher(rows[0]);
  }

  async getBook() {
    const { rows } = await pool.query(
      `
      SELECT
        books.book_id, 
        books.title
      FROM
        books
      LEFT JOIN 
        publishers
      ON
        publishers.publisher_id = books.publisher_id
      WHERE
        publishers.publisher_id = $1
      `,
      [this.publisher_id]
    );
    this.books = rows;
    return this;
  }
};
