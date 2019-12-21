exports.seed = knex => {
  return knex('roles')
    .insert([
      {
        name: 'Student'
      },
      {
        name: 'Helper'
      }
    ])
}