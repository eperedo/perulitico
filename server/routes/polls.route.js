const lunr = require('lunr');
const polls = require('./../data/polls.data');

const pollIndex = lunr(function() {
	this.ref('slug');
	this.field('title');
	this.field('rawDate');
	polls.forEach(function(doc) {
		this.add(doc);
	}, this);
});

const route = {
	handler: async (req, h) => {
		const { search, date } = req.query;
		let searchTerm = '';
		if (search) {
			searchTerm = `+${search}`;
		}
		if (date) {
			searchTerm += ` +${date}`;
		}
		const refs = pollIndex.search(searchTerm);
		const result = refs.reduce((acum, item) => {
			const poll = polls.find((p) => p.slug === item.ref && item.score >= 1);
			if (poll) {
				const newPoll = { ...poll, score: item.score };
				delete newPoll.votes;
				acum.push(newPoll);
			}
			return acum;
		}, []);

		return result;
	},
	method: 'GET',
	path: '/polls',
};

module.exports = route;
