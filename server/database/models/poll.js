const { Model } = require('objection');
class Poll extends Model {
	static get tableName() {
		return 'polls';
	}

	static async exist(tx, { slug }) {
		const poll = await Poll.query(tx)
			.where('slug', slug)
			.first();
		return poll;
	}

	static get relationMappings() {
		const Vote = require('./vote');
		return {
			votes: {
				relation: Model.HasManyRelation,
				modelClass: Vote,
				join: {
					from: 'polls.id',
					to: 'votes.pollId',
				},
			},
		};
	}

	$beforeInsert() {
		this.created_at = new Date();
		this.updated_at = new Date();
	}
}

module.exports = Poll;
