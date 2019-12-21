const db = require('../dbConfig');

const find = () => {
  return db('users');
}

const findBy = property => {
  return db('users')
    .where(property);
}

const add = async user => {
  const [id] = await db('users').insert(user, 'id');

  return findBy(id).first();
}

module.exports = {
  find,
  findBy,
  add
}
