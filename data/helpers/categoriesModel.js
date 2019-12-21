const db = require('../dbConfig');

const find = () => {
  return db('categories');
}

module.exports = {
  find
}
