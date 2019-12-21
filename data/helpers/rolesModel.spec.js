const db = require('../dbConfig');
const Roles = require('./rolesModel');
const cleanup = require('../seeds/01-cleanup');
const seedRoles = require('../seeds/02-roles');

describe('Roles Model', () => {
  beforeEach(async () => {
    await cleanup.seed(db);
    await seedRoles.seed(db);
  })

  describe('when finding all roles', () => {
    it('returns an array', async () => {
      const roles = await Roles.find();

      expect(Array.isArray(roles)).toBe(true);
    })
  })

  describe('when finding specific role', () => {
    it('returns an object with a name and id property', async () => {
      const role = await Roles.findBy({ id: 1 });

      expect('id' in role).toBe(true);
      expect('name' in role).toBe(true);
    })
  })
})