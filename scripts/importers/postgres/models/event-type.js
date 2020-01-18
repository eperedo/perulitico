const { Model } = require('objection');

class EventType extends Model {
	static get tableName() {
		return 'events-types';
	}

	static get relationMappings() {
		const Event = require('./event');
		return {
			events: {
				relation: Model.HasManyRelation,
				modelClass: Event,
				join: {
					from: 'events-types.id',
					to: 'events.typeId',
				},
			},
		};
	}
}

module.exports = EventType;
