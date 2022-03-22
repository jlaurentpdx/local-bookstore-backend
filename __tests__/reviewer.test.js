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

  test('should create a reviewer table row', async () => {
    const expected = {
      name: 'Bo Jenkins',
      company: 'Bo Jo Inc.',
    };
    const resp = await request(app).post('/api/v1/reviewers').send(expected);
    expect(resp.body).toEqual({ reviewer_id: expect.any(String), ...expected });
  });
});
