const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Review = require('../lib/models/Review');

describe('reviews table routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  test('should create a review table row', async () => {
    const expected = {
      rating: 3,
      review: 'Surprisingly mediocre.',
      book_id: '2',
    };
    const resp = await request(app).post('/api/v1/reviews').send(expected);

    expect(resp.body).toEqual({ id: expect.any(String), ...expected });
  });

  test('should display up to 100 reviews', async () => {
    const limitResults = 100;
    const maxRandomRating = 4;

    const highestRated = [
      {
        id: '3',
        rating: 5,
        review: 'I love this book or w/e',
        book_id: '3',
        book_title: 'The Man Who Mistook His Wife for a Hat',
      },
    ];

    const lowestRated = [
      {
        id: '2',
        rating: 0,
        review: 'wow so bad',
        book_id: '2',
        book_title: 'The Three-body Problem',
      },
    ];

    const createFakeReviews = async () => {
      const randomRating = Math.ceil(Math.random() * maxRandomRating);

      return await Review.insert({
        rating: randomRating,
        review: 'BUY BUY BUY',
        book_id: 1,
      });
    };

    for (let i = 0; i < limitResults; i++) {
      await createFakeReviews();
    }

    const resp = await request(app).get('/api/v1/reviews');

    expect(resp.body).toEqual(expect.arrayContaining(highestRated));
    expect(resp.body).not.toEqual(expect.arrayContaining(lowestRated));
    expect(resp.body).toHaveLength(limitResults);
  });

  test('should delete a review by ID', async () => {
    const expected = {
      id: '2',
      rating: 0,
      review: 'wow so bad',
      book_id: '2',
    };
    const resp = await request(app).delete('/api/v1/reviews/2');

    expect(resp.body).toEqual(expected);
  });
});
