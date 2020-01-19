const { Model } = require('objection');

class Event extends Model {
	static get tableName() {
		return 'events';
	}

	static get relationMappings() {
		const Politician = require('./politician');
		return {
			politician: {
				relation: Model.BelongsToOneRelation,
				modelClass: Politician,
				join: {
					from: 'events.politicianId',
					to: 'politicians.id',
				},
			},
		};
	}
}

module.exports = Event;
