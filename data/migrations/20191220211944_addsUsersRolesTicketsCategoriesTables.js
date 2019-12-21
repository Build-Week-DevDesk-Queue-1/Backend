
exports.up = function(knex) {
  return knex.schema.createTable('roles', tbl => {
    tbl.increments('id');

    tbl.string('name', 128)
      .unique()
      .notNullable();
  })
  .createTable('users', tbl => {
    tbl.increments('id');
    
    tbl.integer('role_id')
      .unsigned()
      .references('id')
      .inTable('roles')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      .notNullable();

    tbl.string('email', 128)
      .unique()
      .notNullable();
    
    tbl.string('password', 128)
      .notNullable();
    
    tbl.string('first_name', 128)
      .notNullable();
    
    tbl.string('last_name', 128)
      .notNullable();
  })
  .createTable('categories', tbl => {
    tbl.increments();

    tbl.string('name', 128)
      .unique()
      .notNullable();
  })
  .createTable('tickets', tbl => {
    tbl.increments('id');

    tbl.integer('student_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable();
    
    tbl.integer('category_id')
      .unsigned()
      .references('id')
      .inTable('categories')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      .notNullable();
    
    tbl.integer('helper_id')
      .unsigned()
      .references('id') 
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');

    tbl.string('title', 128)
      .notNullable();
    
    tbl.string('description', 256)
      .notNullable();
    
    tbl.string('tried', 256)
      .notNullable();
    
    tbl.boolean('resolved')
      .defaultTo(false)
      .notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('tickets')   
    .dropTableIfExists('categories')   
    .dropTableIfExists('users')   
    .dropTableIfExists('roles');
};
