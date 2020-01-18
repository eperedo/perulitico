exports.up = function(knex) {
	return knex.schema.createTable('events-types', function(table) {
		table.increments('id');
		table.text('name').notNullable();
		table.text('slug').notNullable();
		table.text('template').notNullable();
		table.timestamps();
	});
};

exports.down = function(knex) {
	return knex.schema.dropTable('events-types');
};
