require('dotenv').config();
const request = require('supertest');
const db = require('../../data/dbConfig');
const cleanup = require('../../data/seeds/01-cleanup');
const seedRoles = require('../../data/seeds/02-roles');
const seedUsers = require('../../data/seeds/03-users');
const seedCategories = require('../../data/seeds/04-categories');
const seedTickets = require('../../data/seeds/05-tickets');
const server = require('../server');

describe('Tickets Router', () => {
  describe('GET on /', () => {
    beforeEach(async () => {
      await cleanup.seed(db);
      await seedRoles.seed(db);
      await seedUsers.seed(db);
      await seedCategories.seed(db);
    })

    it('returns an array when token is valid', async () => {
      const credentials = { email: 'nattajohn@devdeskq.com', password: 'testing123!' }
      const loginResponse = await request(server)
        .post('/api/auth/login')
        .send(credentials)

      const { body: { token } } = loginResponse;
      const headers = { 'Authorization': token };
      
      const response = await request(server)
        .get('/api/tickets')
        .set(headers)

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    })

    it('returned array should not contain any assigned helper already if helper', async () => {
      const credentials = { email: 'nattajohn@devdeskq.com', password: 'testing123!' }
      const loginResponse = await request(server)
        .post('/api/auth/login')
        .send(credentials)

      const { body: { token } } = loginResponse;
      const headers = { 'Authorization': token };
      
      const response = await request(server)
        .get('/api/tickets')
        .set(headers)

      const tickets = response.body.filter(ticket => !!ticket.helper_id !== true);
      expect(!!tickets.length).toBe(false);
    })

    it('returned array should only contain tickets created by the student that made it', async () => {
      await seedTickets.seed(db);

      const credentials = { email: 'michael@devdeskq.com', password: 'testing123!' }
      const loginResponse = await request(server)
        .post('/api/auth/login')
        .send(credentials)

      const { body: { token, user: { id } } } = loginResponse;
      const headers = { 'Authorization': token };
      
      const response = await request(server)
        .get('/api/tickets')
        .set(headers)

      const tickets = response.body;
      expect(tickets.every(ticket => ticket.student_id === id)).toBe(true);
    })
  })
})