exports.up = function(knex) {
	return knex.schema.createTable('politicians', function(table) {
		table.increments('id');
		table.text('fullName').notNullable();
		table.text('slug').notNullable();
		table.text('avatar').nullable();
		table.text('codinome').nullable();
		table.timestamps();
	});
};

exports.down = function(knex) {
	return knex.schema.dropTable('politicians');
};
