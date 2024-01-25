const request = require('supertest');
const app = require('../../../app'); 

describe('User API Endpoints', () => {
  let testUserId; 
  let authToken; 

  it('should create a new user and get authentication token', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Karim',
        email: 'karim@example.com',
        age: 25,
        country: 'egypt',
        mobile: '01132334488',
      })
      .expect(201);

    // Store the ID of the created user and the authentication token
    testUserId = response.body.user.id;
    authToken = response.body.token;
  });

  // Test case: Get all users with authentication
  it('should get all users with authentication', async () => {
    await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
  });

  // Test case: Get a specific user with authentication
  it('should get a specific user with authentication', async () => {
    await request(app)
      .get(`/users/${testUserId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
  });

  // Test case: Update a user with authentication
  it('should update a user with authentication', async () => {
    await request(app)
      .put(`/users/${testUserId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Karim',
        email: 'karim@example.com',
        age: 20,
        country: 'egypt',
        mobile: '01122334488',
      })
      .expect(200);
  });

  // Test case: Delete a user with authentication
  it('should delete a user with authentication', async () => {
    await request(app)
      .delete(`/users/${testUserId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
  });
});

// Cleanup resources after all tests
afterAll(() => {
  const { PrismaClient } = require('../../../../prisma/prisma/client');
  const prisma = new PrismaClient();
  prisma.$disconnect();
});
