const route = {
	handler: async (request) => {
		const { Politician } = request.models();

		const politicians = await Politician.query();

		return politicians;
	},
	method: 'GET',
	path: '/politicians',
};

module.exports = route;
