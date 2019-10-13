const politicians = require('./../data/politicians.data');

const route = {
	handler: async () => {
		return politicians;
	},
	method: 'GET',
	path: '/politicians',
};

module.exports = route;
