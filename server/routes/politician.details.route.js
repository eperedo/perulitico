const route = {
	handler: async (req, h) => {
		const { Politician } = req.models();
		const { slug } = req.params;
		const politician = await Politician.query()
			.where('slug', slug)
			.first();
		if (politician) {
			return politician;
		} else {
			return h.response().code(404);
		}
	},
	method: 'GET',
	path: '/politicians/{slug}',
};

module.exports = route;
