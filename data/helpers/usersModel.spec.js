const db = require('../dbConfig');
const Users = require('./usersModel');
const cleanup = require('../seeds/01-cleanup');
const seedRoles = require('../seeds/02-roles');
const seedUsers = require('../seeds/03-users');

describe('Users Model', () => {
  beforeEach(async () => {
    await cleanup.seed(db);
    await seedRoles.seed(db);
  })

  describe('when finding all users', () => {
    it('returns an empty array with no seeds', async () => {
      const users = await Users.find();
      expect(Array.isArray(users)).toBe(true);
      expect(users).toHaveLength(0);
    })
    it('returns an array of 8 users when seeded', async () => {
      await seedUsers.seed(db);
      const users = await Users.find();
      expect(Array.isArray(users)).toBe(true);
      expect(users).toHaveLength(8);
    })
  })

  describe('when adding new users', () => {
    it('returns a user object with an id attached', async () => {
      const userObject = {
        email: 'test@testmail.com',
        password: 'password123',
        role_id: 1,
        first_name: 'Testing',
        last_name: 'Tester'
      }
      const user = await Users.add(userObject);
      
      expect('id' in user).toBe(true);
    })
  })
})