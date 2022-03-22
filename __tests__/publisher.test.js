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

  test('should display all publishers', async () => {
    const expected = [
      {
        publisher_id: '1',
        name: 'Bantam USA',
        city: 'New York City',
        state: 'NY',
        country: 'US',
      },
      {
        publisher_id: '2',
        name: 'Tom Doherty',
        city: 'New York City',
        state: 'NY',
        country: 'US',
      },
      {
        publisher_id: '3',
        name: 'Simon & Schuster',
        city: 'New York City',
        state: 'NY',
        country: 'US',
      },
    ];
    const resp = await request(app).get('/api/v1/publishers');
    expect(resp.body).toEqual(expect.arrayContaining(expected));
  });
});
