-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS authors, authors_books, books, publishers, reviews, reviewers;

CREATE TABLE authors (
    author_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    dob DATE,
    pob TEXT
);


INSERT INTO 
    authors (name, dob, pob)
VALUES
    ('Tom Robbins', '1932-07-22', 'Blowing Rock, NC, US'),
    ('Liu Cixin', '1963-06-23', 'Beijing, China'),
    ('Oliver Sacks', '1933-07-09', 'London, England');

CREATE TABLE publishers (
    publisher_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT,
    state TEXT,
    country TEXT
);

INSERT INTO 
    publishers (name, city, state, country)
VALUES
    ('Bantam USA', 'New York City', 'NY', 'US'),
    ('Tom Doherty', 'New York City', 'NY', 'US'),
    ('Simon & Schuster', 'New York City', 'NY', 'US');

CREATE TABLE books (
    book_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    released INT NOT NULL,
    publisher_id BIGINT REFERENCES publishers(publisher_id)
);

INSERT INTO
    books (title, released)
VALUES
    ('Jitterbug Perfume', 1984),
    ('The Three-body Problem', 2008),
    ('The Man Who Mistook His Wife for a Hat', 1985);

CREATE TABLE authors_books (
    author_id BIGINT REFERENCES authors(author_id),
    book_id BIGINT REFERENCES books(book_id)
);

INSERT INTO 
    authors_books
VALUES
    (1, 1),
    (2, 2),
    (3, 3);


CREATE TABLE reviewers (
    reviewer_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT NOT NULL
);

INSERT INTO
    reviewers (name, company)
VALUES
    ('Jabroni Phillips', 'Haterade.com'),
    ('Benjamin Doubellewe', 'Pikes Peak Library District'),
    ('Eratemica Jacobs', 'New York Times');

CREATE TABLE reviews (
    review_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rating INT NOT NULL,
    review VARCHAR(140) NOT NULL,
    reviewer_id BIGINT REFERENCES reviewers(reviewer_id),
    book_id BIGINT REFERENCES books(book_id)
);

INSERT INTO
    reviews (rating, review, reviewer_id, book_id)
VALUES
    (4, 'pretty good I guess', 1, 1),
    (1, 'wow so bad', 2, 2),
    (5, 'I love this book or w/e', 3, 3)
