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
});
