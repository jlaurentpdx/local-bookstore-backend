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
});
