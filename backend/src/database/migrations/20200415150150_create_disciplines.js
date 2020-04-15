
exports.up = function(knex) {
    return knex.schema.createTable('disciplines', function (table) {
       table.string('id').primary();
   
       table.string('name').notNullable();
       table.string('workload').notNullable();
       table.string('credit').notNullable();
     });
   };
   
   exports.down = function(knex) {
     return knex.schema.dropTable('disciplines');
   };
   