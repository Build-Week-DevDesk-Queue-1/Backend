const db = require('../dbConfig');

const find = () => {
  return db('tickets');
}

const findBy = property => {
  return db('tickets')
    .where(property);
}

const add = async ticket => {
  const [id] = await db('tickets').insert(ticket, 'id');
  
  return findBy({ id }).first();
}

module.exports = {
  find,
  findBy,
  add
}