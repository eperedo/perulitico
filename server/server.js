require('dotenv').config();
const Hapi = require('@hapi/hapi');

const objectionPlugin = require('./plugins/objection');
const politiciansRoute = require('./routes/politician.route');
const pollRoute = require('./routes/polls.details.route');
const pollsRoute = require('./routes/polls.route');
const politicianRoute = require('./routes/politician.details.route');
const eventRoute = require('./routes/events.details.route');

const server = Hapi.Server({
	host: process.env.HOST || 'localhost',
	port: process.env.PORT || 2000,
	routes: {
		cors: true,
	},
});

async function startServer() {
	await server.register({
		plugin: objectionPlugin,
	});
	server.route(politiciansRoute);
	server.route(pollRoute);
	server.route(pollsRoute);
	server.route(politicianRoute);
	server.route(eventRoute);
	await server.start();
	console.log(`Server running on ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});

startServer();
