const db = require('../../dbConfig');
const Roles = require('./rolesModel');
const cleanup = require('../../seeds/01-cleanup');
const seedRoles = require('../../seeds/02-roles');

describe('Roles Model', () => {

  describe('when finding all roles', () => {
    beforeEach(async () => {
      await cleanup.seed(db);
      await seedRoles.seed(db);
    })

    it('returns an array', async () => {
      const roles = await Roles.find();

      expect(Array.isArray(roles)).toBe(true);
    })
  })

  describe('when finding specific role', () => {
    beforeEach(async () => {
      await cleanup.seed(db);
      await seedRoles.seed(db);
    })

    it('returns an object with a name and id property', async () => {
      const role = await Roles.findBy({ id: 1 });

      expect('id' in role).toBe(true);
      expect('name' in role).toBe(true);
    })
  })
})