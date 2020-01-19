const route = {
	handler: async (req, h) => {
		const { slug } = req.params;
		const { Poll } = req.models();
		const poll = await Poll.query()
			.eager('votes')
			.where('slug', slug)
			.first();
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
