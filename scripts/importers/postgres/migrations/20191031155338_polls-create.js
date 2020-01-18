exports.up = function(knex) {
	return knex.schema.createTable('polls', function(table) {
		table.increments('id');
		table.text('slug').notNullable();
		table.text('title').notNullable();
		table.json('result').notNullable();
		table.timestamp('rawDate');
		table.timestamps();
	});
};

exports.down = function(knex) {
	return knex.schema.dropTable('polls');
};
