exports.up = function(knex) {
	return knex.schema.createTable('votes', function(table) {
		table.increments('id');
		table.integer('politicianId').notNullable();
		table.integer('pollId').notNullable();
		table.foreign('politicianId').references('politicians.id');
		table.foreign('pollId').references('polls.id');
		table.text('politicianName').notNullable();
		table.text('politicianSlug').notNullable();
		table.text('politicianParty').nullable();
		table.text('value').notNullable();
		table.text('voteColor').notNullable();
		table.text('voteLabel').notNullable();
		table.timestamps();
	});
};

exports.down = function(knex) {
	return knex.schema.dropTable('votes');
};
