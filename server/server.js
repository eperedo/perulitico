const Hapi = require('@hapi/hapi');

const politiciansRoute = require('./routes/politician.route');

const server = Hapi.Server({
	host: process.env.HOST || 'localhost',
	port: process.env.PORT || 3000,
	routes: {
		cors: true,
	},
});

async function startServer() {
	server.route(politiciansRoute);
	await server.start();
	console.log(`Server running on ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
	process.exit(1);
});

startServer();
