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
