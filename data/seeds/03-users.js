const bcrypt = require('bcryptjs');
exports.seed = knex => {
  return knex('users')
    .insert([
      {
        email: 'nattajohn@devdeskq.com',
        password: bcrypt.hashSync('testing123!',12),
        role_id: 2,
        first_name: 'Nattajohn',
        last_name: 'Rojanasupya'
      },
      {
        email: 'jonathan@devdeskq.com',
        password: bcrypt.hashSync('testing123!',12),
        role_id: 1,
        first_name: 'Jonathan',
        last_name: 'Chen'
      },
      {
        email: 'adam@devdeskq.com',
        password: bcrypt.hashSync('testing123!',12),
        role_id: 2,
        first_name: 'Adam',
        last_name: 'Skoog'
      },
      {
        email: 'preston@devdeskq.com',
        password: bcrypt.hashSync('testing123!',12),
        role_id: 1,
        first_name: 'Preston',
        last_name: 'Middleton'
      },
      {
        email: 'nic@devdeskq.com',
        password: bcrypt.hashSync('testing123!',12),
        role_id: 2,
        first_name: 'Nic',
        last_name: 'Kendall'
      },
      {
        email: 'micah@devdeskq.com',
        password: bcrypt.hashSync('testing123!',12),
        role_id: 1,
        first_name: 'Micah',
        last_name: 'Jank'
      },
      {
        email: 'michael@devdeskq.com',
        password: bcrypt.hashSync('testing123!',12),
        role_id: 1,
        first_name: 'Michael',
        last_name: 'Ross'
      },
      {
        email: 'adebola@devdeskq.com',
        password: bcrypt.hashSync('testing123!',12),
        role_id: 1,
        first_name: 'Adebola',
        last_name: 'Adesina'
      },
    ])
}