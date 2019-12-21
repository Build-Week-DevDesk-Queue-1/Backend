const db = require('../dbConfig');
const Tickets = require('./ticketsModel');
const cleanup = require('../seeds/01-cleanup');
const seedRoles = require('../seeds/02-roles');
const seedUsers = require('../seeds/03-users');
const seedCategories = require('../seeds/04-categories');
const seedTickets = require('../seeds/05-tickets');

describe('Tickets Model', () => {
  beforeEach(async () => {
    await cleanup.seed(db);
    await seedRoles.seed(db);
    await seedUsers.seed(db);
    await seedCategories.seed(db);
  })

  describe('when finding all tickets', () => {
    it('returns an empty array with no seeds', async () => {
      const tickets = await Users.find();
      expect(Array.isArray(tickets)).toBe(true);
      expect(tickets).toHaveLength(0);
    })
    it('returns an array of 2 tickets when seeded', async () => {
      await seedTickets.seed(db);
      const tickets = await Tickets.find();
      expect(Array.isArray(tickets)).toBe(true);
      expect(tickets).toHaveLength(2);
    })
  })

  describe('when adding a new ticket', () => {
    it('returns a ticket object with an id attached', async () => {
      const ticketObject = {
        title: 'Test Ticket',
        description: 'This is a test description',
        category_id: 2,
        student_id: 2,
        tried: 'Everything'
      }

      const ticket = await Tickets.add(ticketObject);

      expect('id' in ticket).toBe(true);
    })
  })
})