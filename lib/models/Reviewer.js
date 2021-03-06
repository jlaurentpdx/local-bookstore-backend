const pool = require('../utils/pool');

module.exports = class Reviewer {
  reviewer_id;
  name;
  company;

  constructor(row) {
    this.id = row.reviewer_id;
    this.name = row.name;
    this.company = row.company;
  }

  static async insert({ name, company }) {
    const { rows } = await pool.query(
      `
          INSERT INTO
              reviewers (name, company)
          VALUES
              ($1, $2)
          RETURNING
              *
          `,
      [name, company]
    );
    return new Reviewer(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT *
        FROM reviewers
        `
    );
    return rows.map((row) => new Reviewer(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT *
        FROM reviewers
        WHERE reviewer_id = $1
        `,
      [id]
    );
    return new Reviewer(rows[0]);
  }

  static async update(id, attributes) {
    const existingReviewer = await Reviewer.getById(id);
    const updateReviewer = { ...existingReviewer, ...attributes };

    const { name, company } = updateReviewer;

    const { rows } = await pool.query(
      `
      UPDATE 
        reviewers
      SET 
        name=$1,
        company=$2
      WHERE
        reviewer_id=$3
      RETURNING 
        *
      `,
      [name, company, id]
    );

    return new Reviewer(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM 
          reviewers
        WHERE 
          reviewer_id=$1
        RETURNING
          *
        `,
      [id]
    );

    return new Reviewer(rows[0]);
  }

  async getReviews() {
    const { rows } = await pool.query(
      `
      SELECT
        review_id,
        rating,
        review,
        reviews.book_id,
        title AS book_title
      FROM
        reviews
      INNER JOIN
        books
      ON
        books.book_id = reviews.book_id
      INNER JOIN
        reviewers
      ON
        reviews.reviewer_id = reviewers.reviewer_id
      WHERE
        reviewers.reviewer_id = $1
      `,
      [this.id]
    );

    this.reviews = rows;

    return this;
  }

  async countReviews() {
    const { rows } = await pool.query(
      `
      SELECT
        COUNT(review_id)
      FROM
        reviews
      INNER JOIN
        reviewers
      ON
        reviews.reviewer_id = reviewers.reviewer_id
      WHERE
        reviewers.reviewer_id = $1
      `,
      [this.id]
    );

    return rows[0];
  }
};
