const Roles = require('./rolesModel');

describe('Tickets Model', () => {
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
})