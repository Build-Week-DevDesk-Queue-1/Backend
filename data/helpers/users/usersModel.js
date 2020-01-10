const db = require('../../dbConfig');

const find = () => {
  return db('users');
}

const findBy = properties => {
  if (Array.isArray(properties)) {
    return db('users')
      .select('users.id', 'role_id', 'email', 'password', 'first_name', 'last_name', 'roles.name as role')
      .where(...properties)
      .join('roles', 'role_id', 'roles.id')
  }

  return db('users')
    .select('users.id', 'role_id', 'email', 'password', 'first_name', 'last_name', 'roles.name as role')
    .where(properties)
    .join('roles', 'role_id', 'roles.id')
}

const add = async user => {
  const [id] = await db('users').insert(user, 'id');

  return findBy(['users.id', id])
    .first();
}

module.exports = {
  find,
  findBy,
  add
}
