const name = 'objection';
const version = '1.0.0';

require('./../database/connection');

function getModels() {
	const EventType = require('./../database/models/event-type');
	const Poll = require('./../database/models/poll');
	const Politician = require('./../database/models/politician');
	const Vote = require('./../database/models/vote');

	return {
		EventType,
		Poll,
		Politician,
		Vote,
	};
}

function register(server) {
	server.decorate('request', 'models', getModels);
}

module.exports = { register, name, version };
