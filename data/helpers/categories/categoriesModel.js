const db = require('../../dbConfig');

const find = () => {
  return db('categories');
}

const findBy = property => {
  return db('categories')
    .where(property)
}

module.exports = {
  find,
  findBy
}
