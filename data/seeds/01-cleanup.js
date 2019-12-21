const cleaner = require('knex-cleaner');
exports.seed = async knex => {
  const environment = process.env.DB_ENV;
  if (['staging', 'production'].find(env => env === environment)) {
    return cleaner.clean(knex, {
      mode: 'truncate',
      restartIdentity: true,
      ignoreTables: ['knex_migrations', 'knex_migrations_lock']
    });
  }
  await knex('tickets').truncate();
  await knex('categories').truncate();
  await knex('users').truncate();
  await knex('roles').truncate();
};
