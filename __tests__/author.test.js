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

  test('should display all authors', async () => {
    const expected = [
      {
        author_id: '1',
        name: 'Tom Robbins',
        dob: '1932-07-22T08:00:00.000Z',
        pob: 'Blowing Rock, NC, US',
      },
      {
        author_id: '2',
        name: 'Liu Cixin',
        dob: '1963-06-23T07:00:00.000Z',
        pob: 'Beijing, China',
      },
      {
        author_id: '3',
        name: 'Oliver Sacks',
        dob: '1933-07-09T08:00:00.000Z',
        pob: 'London, England',
      },
    ];
    const resp = await request(app).get('/api/v1/authors');
    expect(resp.body).toEqual(expect.arrayContaining(expected));
  });
});
