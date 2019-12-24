const knex = require('knex');
const db = require('../../dbConfig');

const find = () => {
  return db('tickets');
}

const findBy = properties => {
  return db('tickets')
    .where(...properties)
    .select(
      'students.first_name as student_first_name', 
      'students.last_name as student_last_name',
      'helpers.first_name as helper_first_name',
      'helpers.last_name as helper_last_name',
      'tickets.*')
    .join('users as students', 'students.id', 'tickets.student_id')
    .leftOuterJoin('users as helpers', 'helpers.id', 'tickets.helper_id')
}

const validateId = id => {
  return db('tickets')
    .where({ id })
    .first();
}

const change = async (id, changes) => {
  changes.updated_at = new Date;
  console.log(changes);

  await findBy(['tickets.id', id]).update(changes);

  return findBy(['tickets.id', id]).first();
}

const remove = id => {
  return findBy(['tickets.id', id]).delete();
}

const add = async ticket => {
  ticket.created_at = new Date;
  const [id] = await db('tickets').insert(ticket, 'id');
  
  return findBy(['tickets.id', id]).first();
}

module.exports = {
  find,
  findBy,
  validateId,
  change,
  remove,
  add
}