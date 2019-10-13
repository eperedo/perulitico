const polls = require('./../data/polls.data');

const route = {
	handler: async (req, h) => {
		const { slug } = req.params;
		const poll = polls.find((p) => p.slug === slug);
		if (poll) {
			return poll;
		} else {
			return h.response().code(404);
		}
	},
	method: 'GET',
	path: '/polls/{slug}',
};

module.exports = route;
