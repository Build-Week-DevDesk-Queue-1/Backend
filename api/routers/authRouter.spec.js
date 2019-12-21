require('dotenv').config();

const db = require('../../data/dbConfig');
const cleanup = require('../../data/seeds/01-cleanup');
const seedRoles = require('../../data/seeds/02-roles');
const request = require('supertest');
const server = require('../server');

const registerTemplate = {
    email: 'test@testmail.com',
    password: 'testing123!',
    first_name: 'Testing',
    last_name: 'Tester',
    role_id: 2
}

const loginTemplate = {
  email: 'test@testmail.com',
  password: 'testing123!'
}

describe('Authentication Router', () => {
  beforeEach(async () => {
    await cleanup.seed(db);
    await seedRoles.seed(db);
  })

  describe('POST /register', () => {
    it('does not allow an empty request body', async () => {
      const registerObject = {};
      const response = await request(server)
        .post('/api/auth/register')
        .send(registerObject);
      
      expect(response.status).toBe(400);
    })

    it('does not allow registration without an email', async () => {
      const registerObject = { ...registerTemplate };
      delete registerObject.email;
      
      const response = await request(server)
        .post('/api/auth/register')
        .send(registerObject);
      
      expect(response.status).toBe(400);
    })

    it('does not allow an empty email', async () => {
      const registerObject = { ...registerTemplate, email: '' };
      const response = await request(server)
        .post('/api/auth/register')
        .send(registerObject);
      
      expect(response.status).toBe(400);
    })

    it('does not allow an invalid email pattern', async () => {
      const registerObject = { ...registerTemplate, email: 'test@com' }
      const response = await request(server)
        .post('/api/auth/register')
        .send(registerObject);
      
      expect(response.status).toBe(400);
    })

    it('does not allow registration without a password', async () => {
      const registerObject = { ...registerTemplate };
      delete registerObject.password;
      
      const response = await request(server)
        .post('/api/auth/register')
        .send(registerObject);
      
      expect(response.status).toBe(400);
    })

    it('does not allow empty password', async () => {
      const registerObject = { ...registerTemplate, password: '' };
      
      const response = await request(server)
        .post('/api/auth/register')
        .send(registerObject);
      
      expect(response.status).toBe(400);
    })

    it('does not allow an invalid password pattern', async () => {
      const registerObject = { ...registerTemplate, password: 'test' };
      
      const response = await request(server)
        .post('/api/auth/register')
        .send(registerObject);
      
      expect(response.status).toBe(400);
    })

    it('does not allow registration without first name', async () => {
      const registerObject = { ...registerTemplate };
      delete registerObject.first_name; 

      const response = await request(server)
        .post('/api/auth/register')
        .send(registerObject);
      
      expect(response.status).toBe(400);
    })

    it('does not allow an empty first name', async () => {
      const registerObject = { ...registerTemplate, first_name: '' };

      const response = await request(server)
        .post('/api/auth/register')
        .send(registerObject);
      
      expect(response.status).toBe(400);
    })

    it('does not allow registration without last name', async () => {
      const registerObject = { ...registerTemplate };
      delete registerObject.last_name; 

      const response = await request(server)
        .post('/api/auth/register')
        .send(registerObject);
      
      expect(response.status).toBe(400);
    })

    it('does not allow an empty last name', async () => {
      const registerObject = { ...registerTemplate, last_name: '' };

      const response = await request(server)
        .post('/api/auth/register')
        .send(registerObject);
      
      expect(response.status).toBe(400);
    })

    it('does not allow registration without role id', async () => {
      const registerObject = { ...registerTemplate };
      delete registerObject.role_id;

      const response = await request(server)
        .post('/api/auth/register')
        .send(registerObject);
      
      expect(response.status).toBe(400);
    })

    it('does not allow registration without a valid role id', async () => {
      const registerObject = { ...registerTemplate, role_id: 999 };

      const response = await request(server)
        .post('/api/auth/register')
        .send(registerObject);
      
      expect(response.status).toBe(404);
    })

    it('returns a status code 201 and a user object with a token', async () => {
      const response = await request(server)
        .post('/api/auth/register')
        .send(registerTemplate);

      expect(response.status).toBe(201);
      expect('user' in response.body).toBe(true);
      expect('token' in response.body).toBe(true);
    })
  })

  describe('POST /login', () => {
    it('does not allow an empty request body', async () => {
      const loginObject = {};
      const response = await request(server)
        .post('/api/auth/login')
        .send(loginObject);
      
      expect(response.status).toBe(400);
    })

    it('does not allow login without an email', async () => {
      const loginObject = { ...loginTemplate };
      delete loginObject.email;
      
      const response = await request(server)
        .post('/api/auth/login')
        .send(loginObject);
      
      expect(response.status).toBe(400);
    })

    it('does not allow an empty email', async () => {
      const loginObject = { ...loginTemplate, email: '' };
      const response = await request(server)
        .post('/api/auth/login')
        .send(loginObject);
      
      expect(response.status).toBe(400);
    })

    it('does not allow an invalid email pattern', async () => {
      const loginObject = { ...loginTemplate, email: 'test@com' }
      const response = await request(server)
        .post('/api/auth/login')
        .send(loginObject);
      
      expect(response.status).toBe(400);
    })

    it('does not allow login without a password', async () => {
      const loginObject = { ...loginTemplate };
      delete loginObject.password;
      
      const response = await request(server)
        .post('/api/auth/login')
        .send(loginObject);
      
      expect(response.status).toBe(400);
    })

    it('does not allow empty password', async () => {
      const loginObject = { ...loginTemplate, password: '' };
      
      const response = await request(server)
        .post('/api/auth/login')
        .send(loginObject);
      
      expect(response.status).toBe(400);
    })

    it('does not allow an invalid password pattern', async () => {
      const loginObject = { ...loginTemplate, password: 'test' };
      
      const response = await request(server)
        .post('/api/auth/login')
        .send(loginObject);
      
      expect(response.status).toBe(400);
    })

    it('returns a status of 404 when the credentials don\'t exist in the db', async () => {
      const response = await request(server)
        .post('/api/auth/login')
        .send(loginTemplate);

      expect(response.status).toBe(404);
    })

    it('returns a status code 200 and a user object with a token', async () => {
      await request(server)
        .post('/api/auth/register')
        .send(registerTemplate);

      const response = await request(server)
        .post('/api/auth/login')
        .send(loginTemplate);
      
      expect(response.status).toBe(200);
      expect('user' in response.body).toBe(true);
      expect('token' in response.body).toBe(true);
    })
  })
})