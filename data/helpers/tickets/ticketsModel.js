const db = require('../../dbConfig');

const find = () => {
  return db('tickets');
}

const findBy = property => {
  return db('tickets')
    .where(property);
}

const change = async (id, changes) => {
  await findBy({ id }).update(changes);

  return findBy({ id }).first();
}

const add = async ticket => {
  const [id] = await db('tickets').insert(ticket, 'id');
  
  return findBy({ id }).first();
}

module.exports = {
  find,
  findBy,
  change,
  add
}