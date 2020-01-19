require('dotenv').config({ path: './../.env' });

const connection = {
	development: {
		debug: true,
		client: 'pg',
		connection: process.env.PG_URL_DEV,
	},
	production: {
		client: 'pg',
		connection: process.env.PG_URL_PROD,
		pool: {
			min: 1,
			max: 2,
		},
		migrations: {
			tableName: 'knex_migrations',
		},
	},
};

module.exports = connection[process.env.NODE_ENV || 'development'];
