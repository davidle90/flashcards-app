const request = require('supertest');
const app = require('./index'); // Your Express app

describe('Category API', () => {
  it('should create a new category', async () => {
    const response = await request(app)
      .post('/categories')
      .send({ name: 'Science', description: 'Science related flashcards' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('name', 'Science');
  });

  it('should fetch a category by id', async () => {
    const categoryResponse = await request(app)
      .post('/categories')
      .send({ name: 'Math', description: 'Math related flashcards' });

    const categoryId = categoryResponse.body.id;

    const response = await request(app).get(`/categories/${categoryId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', 'Math');
  });
});
