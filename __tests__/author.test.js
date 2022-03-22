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

  test('should create an author table row', async () => {
    const expected = {
      name: 'Haruki Murakami',
      dob: '1/12/1949',
      pob: 'Kyoto, Japan',
    };
    const resp = await request(app).post('/api/v1/authors').send(expected);
    expect(resp.body).toEqual({ author_id: expect.any(String), ...expected });
  });
});
