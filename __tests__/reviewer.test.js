const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Reviewer = require('../lib/models/Reviewer');

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

    expect(resp.body).toEqual({ id: expect.any(String), ...expected });
  });

  test('should display a list of all reviewers', async () => {
    const expected = [
      {
        id: '1',
        name: 'Jabroni Phillips',
        company: 'Haterade.com',
      },
      {
        id: '2',
        name: 'Benjamin Doubellewe',
        company: 'Pikes Peak Library District',
      },
      {
        id: '3',
        name: 'Eratemica Jacobs',
        company: 'New York Times',
      },
    ];
    const resp = await request(app).get('/api/v1/reviewers');

    expect(resp.body).toEqual(expect.arrayContaining(expected));
  });

  test('should display a reviewer by id', async () => {
    const expected = {
      id: '3',
      name: 'Eratemica Jacobs',
      company: 'New York Times',
      reviews: [
        {
          review_id: '3',
          rating: 5,
          review: 'I love this book or w/e',
          book_id: '3',
          book_title: 'The Man Who Mistook His Wife for a Hat',
        },
        {
          review_id: '4',
          rating: 3,
          review: 'Three bodies, three stars',
          book_id: '2',
          book_title: 'The Three-body Problem',
        },
      ],
    };
    const resp = await request(app).get(`/api/v1/reviewers/${expected.id}`);

    expect(resp.body).toEqual(expected);
  });

  test('should display a 404 error on bad request', async () => {
    const resp = await request(app).get('/api/v1/reviewers/bad');
    expect(resp.status).toEqual(404);
  });

  test('should update an existing reviewer', async () => {
    const expected = {
      id: '2',
      name: 'Benjamin W. Doubelewe',
      company: 'Pikes Peak Library District',
    };
    const resp = await request(app)
      .put('/api/v1/reviewers/2')
      .send({ name: 'Benjamin W. Doubelewe' });

    expect(resp.body).toEqual(expected);
  });

  test('should fail to delete an existing reviewer with reviews', async () => {
    const resp = await request(app).delete('/api/v1/reviewers/3');
    expect(resp.status).toEqual(404);
  });

  test('should delete an existing reviewer with no reviews', async () => {
    const expected = await Reviewer.insert({
      name: 'Phony Man',
      company: 'phonybooky',
    });
    const resp = await request(app).delete(`/api/v1/reviewers/${expected.id}`);

    expect(resp.body).toEqual(expected);

    const excludeDeleted = await Reviewer.getAll();

    expect(excludeDeleted).not.toContainEqual(expected);
  });
});
