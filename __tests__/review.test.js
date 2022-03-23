const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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
    };
    const resp = await request(app).post('/api/v1/reviews').send(expected);

    expect(resp.body).toEqual({ id: expect.any(String), ...expected });
  });

  test('should display all reviews', async () => {
    const expected = [
      {
        id: '1',
        rating: 4,
        review: 'pretty good I guess',
      },
      {
        id: '2',
        rating: 1,
        review: 'wow so bad',
      },
    ];
    const resp = await request(app).get('/api/v1/reviews');

    expect(resp.body).toEqual(expect.arrayContaining(expected));
  });
});
