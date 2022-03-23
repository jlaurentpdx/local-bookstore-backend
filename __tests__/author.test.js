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
        dob: '7/22/1932',
        pob: 'Blowing Rock, NC, US',
      },
      {
        author_id: '2',
        name: 'Liu Cixin',
        dob: '6/23/1963',
        pob: 'Beijing, China',
      },
      {
        author_id: '3',
        name: 'Oliver Sacks',
        dob: '7/9/1933',
        pob: 'London, England',
      },
    ];
    const resp = await request(app).get('/api/v1/authors');
    expect(resp.body).toEqual(expect.arrayContaining(expected));
  });

  test('should display an author by ID', async () => {
    const expected = {
      author_id: '1',
      name: 'Tom Robbins',
      dob: '7/22/1932',
      pob: 'Blowing Rock, NC, US',
      books: [{ book_id: '1', title: 'Jitterbug Perfume', released: 1984 }]
    };

    const resp = await request(app).get('/api/v1/authors/1');
    expect(resp.body).toEqual(expected);
  });

  test('should display a 404 error on a bad request', async () => {
    const resp = await request(app).get('/api/v1/authors/fake');
    expect(resp.status).toEqual(404);
  });
});
