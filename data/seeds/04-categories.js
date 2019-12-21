exports.seed = knex => {
  return knex('categories')
    .insert([
      {name: 'User Interface and Git'},
      {name: 'Advanced CSS'},
      {name: 'JavaScript Fundamentals'},
      {name: 'Applied JavaScript'},
      {name: 'Intro to React'},
      {name: 'Single Page Applications'},
      {name: 'Advanced React'},
      {name: 'Advanced State Management'},
      {name: 'Advanced Web Applications'},
      {name: 'Build a Web API'},
      {name: 'Adding Data Persistence'},
      {name: 'Authentication and Testing'},
      {name: 'Intro to Python and OOP'},
      {name: 'Algorithms'},
      {name: 'Data Structures'},
      {name: 'Hash Tables and Blockchain'},
      {name: 'Graphs'},
      {name: 'Computer Architecture'},
      {name: 'Data Structures: Heaps'}
    ])
}