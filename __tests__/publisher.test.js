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

  test('should create a publisher table row', async () => {
    const expected = {
      name: 'Pengiun',
      city: 'London',
      state: '',
      country: 'England',
    };
    const resp = await request(app).post('/api/v1/publishers').send(expected);
    expect(resp.body).toEqual({
      publisher_id: expect.any(String),
      ...expected,
    });
  });
});
