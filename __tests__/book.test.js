const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('local-bookstore routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  test('should create an books table row', async () => {
    const expected = {
      title: 'The Stranger',
      released: 1942,
    };
    const resp = await request(app).post('/api/v1/books').send(expected);
    expect(resp.body).toEqual({ book_id: expect.any(String), ...expected });
  });

  test('should display all books', async () => {
    const expected = [
      {
        book_id: '1',
        title: 'Jitterbug Perfume',
        released: 1984,
      },
      {
        book_id: '2',
        title: 'The Three-body Problem',
        released: 2008,
      },
      {
        book_id: '3',
        title: 'The Man Who Mistook His Wife for a Hat',
        released: 1985,
      },
    ];
    const resp = await request(app).get('/api/v1/books');
    expect(resp.body).toEqual(expect.arrayContaining(expected));
  });

  test('should display an book by ID', async () => {
    const expected = {
      book_id: '1',
      title: 'Jitterbug Perfume',
      released: 1984,
      publisher: '1',
      authors: [{ author_id: '1', name: 'Tom Robbins' }],
      reviews: [
        {
          review_id: '1',
          rating: 4,
          review: 'pretty good I guess',
          reviewer: { reviewer_id: '1', name: 'Jabroni Phillips' },
        },
      ],
    };

    const resp = await request(app).get('/api/v1/books/1');
    expect(resp.body).toEqual(expected);
  });
});
