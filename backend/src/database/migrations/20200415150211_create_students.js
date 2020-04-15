
exports.up = function(knex) {
    return knex.schema.createTable('students', function (table) {
       table.increments();
   
       table.string('name').notNullable();
       table.string('cpf').notNullable();
       table.decimal('registration').notNullable();
   
       table.string('discipline_id').notNullable();
   
       table.foreign('discipline_id').references('id').inTable('disciplines');
    });
   };
   
   exports.down = function(knex) {
     return knex.schema.dropTable('students');
   };
   