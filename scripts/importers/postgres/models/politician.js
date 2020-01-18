const { Model } = require('objection');

class Politician extends Model {
	static get tableName() {
		return 'politicians';
	}

	static async existPolitician(tx, { slug }) {
		const pol = await Politician.query(tx)
			.where('slug', slug)
			.first();
		return pol;
	}

	static get relationMappings() {
		const Event = require('./event');
		return {
			events: {
				relation: Model.HasManyRelation,
				modelClass: Event,
				join: {
					from: 'politicians.id',
					to: 'events.politicianId',
				},
			},
		};
	}

	$beforeInsert() {
		this.created_at = new Date();
		this.updated_at = new Date();
	}
}

module.exports = Politician;
