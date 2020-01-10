const db = require('../../dbConfig');

const find = () => {
  return db('roles');
}

const findBy = property => {
  return db('roles')
    .where(property)
    .first();
}

module.exports = {
  find,
  findBy
}