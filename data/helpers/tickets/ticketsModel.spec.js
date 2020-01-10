const db = require('../../dbConfig');
const Tickets = require('./ticketsModel');
const cleanup = require('../../seeds/01-cleanup');
const seedRoles = require('../../seeds/02-roles');
const seedUsers = require('../../seeds/03-users');
const seedCategories = require('../../seeds/04-categories');
const seedTickets = require('../../seeds/05-tickets');

describe('Tickets Model', () => {

  describe('when finding all tickets', () => {
    beforeEach(async () => {
      await cleanup.seed(db);
      await seedRoles.seed(db);
      await seedUsers.seed(db);
      await seedCategories.seed(db);
    })
    
    afterEach(async () => {
      await cleanup.seed(db);
    })

    it('returns an array', async () => {
      const tickets = await Tickets.find();
      expect(Array.isArray(tickets)).toBe(true);
    })
    
    it('is able to filter by unresolved tickets', async () => {
      const id = 2;
      const changes = { resolved: true };

      await seedTickets.seed(db);
      await Tickets.change(id , changes);

      const tickets = await Tickets.findBy({ resolved: false });
      expect(tickets).toHaveLength(1);
    })
      
  })

  describe('when updating an existing ticket', () => {
    beforeEach(async () => {
      await cleanup.seed(db);
      await seedRoles.seed(db);
      await seedUsers.seed(db);
      await seedCategories.seed(db);
    })

    it('returns the ticket back with the updated field', async () => {
      await seedTickets.seed(db);
      const id = 2;
      const changes = { resolved: true };
      const ticket = await Tickets.change(id , changes);

      expect(!!ticket.resolved).toBe(true);
    })
  })

  describe('when adding a new ticket', () => {
    beforeEach(async () => {
      await cleanup.seed(db);
      await seedRoles.seed(db);
      await seedUsers.seed(db);
      await seedCategories.seed(db);
    })

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