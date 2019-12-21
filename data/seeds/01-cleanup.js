exports.seed = async knex => {
  await knex('tickets').truncate();
  await knex('categories').truncate();
  await knex('users').truncate();
  await knex('roles').truncate();
};
