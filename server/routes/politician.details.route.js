const politicians = require('./../data/politicians.data');

const route = {
	handler: async (req, h) => {
		const { slug } = req.params;
		const politician = politicians.find((p) => p.slug === slug);
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
