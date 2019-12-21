const Categories = require('./categoriesModel');
const seedCategories = require('../seeds/04-categories');

describe('Categories Model', () => {
  beforeEach(async () => {
    await cleanup.seed(db);
    await seedCategories.seed(db);
  })

  describe('when finding all roles', () => {
    it('returns an array', async () => {
      const categories = await Categories.find();

      expect(Array.isArray(categories)).toBe(true);
    })
  })
})