const db = require('../dbConfig');

const find = () => {
  return db('users');
}

const findBy = properties => {
  if (Array.isArray(properties)) {
    return db('users')
      .where(...properties)
  }

  return db('users')
    .where(properties);
}

const add = async user => {
  const [id] = await db('users').insert(user, 'id');

  return findBy(['users.id', id])
    .select('users.id', 'role_id', 'email', 'first_name', 'last_name', 'roles.id as role')
    .join('roles', 'role_id', 'roles.id')
    .first();
}

module.exports = {
  find,
  findBy,
  add
}
