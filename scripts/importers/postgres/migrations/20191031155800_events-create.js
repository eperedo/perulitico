exports.up = function(knex) {
	return knex.schema.createTable('events', function(table) {
		table.increments('id');
		table.integer('politicianId').notNullable();
		table.integer('eventTypeId').notNullable();
		table.foreign('politicianId').references('politicians.id');
		table.foreign('eventTypeId').references('events-types.id');
		table.text('description').notNullable();
		table.json('details').nullable();
		table.timestamp('eventDate').notNullable();
		table.timestamps();
	});
};

exports.down = function(knex) {
	return knex.schema.dropTable('events');
};
