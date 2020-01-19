const { Model } = require('objection');

const EVENT_TYPE = 'votacion-congreso';

function renderTemplate(template, values) {
	return values.reduce((acum, value, index) => {
		acum = acum.replace(`{${index}}`, value);
		return acum;
	}, template);
}

class Votes extends Model {
	static get tableName() {
		return 'votes';
	}

	static get relationMappings() {
		const Politician = require('./politician');
		const Poll = require('./poll');
		return {
			politician: {
				relation: Model.BelongsToOneRelation,
				modelClass: Politician,
				join: {
					from: 'votes.politicianId',
					to: 'politicians.id',
				},
			},
			poll: {
				relation: Model.BelongsToOneRelation,
				modelClass: Poll,
				join: {
					from: 'votes.pollId',
					to: 'polls.id',
				},
			},
		};
	}

	$beforeInsert() {
		this.created_at = new Date();
		this.updated_at = new Date();
	}

	// async $afterInsert(context) {
	// 	const eventType = require('./event-type');
	// 	const event = require('./event');
	// 	const poll = require('./poll');
	// 	const [et, pollDb] = await Promise.all([
	// 		eventType
	// 			.query(context.transaction)
	// 			.where('slug', EVENT_TYPE)
	// 			.first(),
	// 		poll
	// 			.query(context.transaction)
	// 			.where('id', this.pollId)
	// 			.first(),
	// 	]);

	// 	if (et) {
	// 		const description = renderTemplate(et.template, [
	// 			this.value,
	// 			pollDb.title,
	// 		]);
	// 		const newEvent = {
	// 			description,
	// 			politicianId: this.politicianId,
	// 			eventTypeId: et.id,
	// 			eventDate: pollDb.rawDate,
	// 			details: {
	// 				webSlug: pollDb.slug,
	// 			},
	// 		};
	// 		await event.query(context.transaction).insert(newEvent);
	// 		return newEvent;
	// 	} else {
	// 		throw new Error(`Cannot found event type ${EVENT_TYPE}`);
	// 	}
	// }
}

module.exports = Votes;
