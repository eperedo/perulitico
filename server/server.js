const Hapi = require('@hapi/hapi');

const politiciansRoute = require('./routes/politician.route');
const pollsRoute = require('./routes/polls.route');
const pollRoute = require('./routes/polls.details.route');

const server = Hapi.Server({
	host: process.env.HOST || 'localhost',
	port: process.env.PORT || 3000,
	routes: {
		cors: true,
	},
});

async function startServer() {
	server.route(politiciansRoute);
	server.route(pollsRoute);
	server.route(pollRoute);
	await server.start();
	console.log(`Server running on ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
	process.exit(1);
});

startServer();
