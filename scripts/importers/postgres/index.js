require('./connection');

const pathPoliticians = './../../politicians-1572549494025.json';
const pathPolls = './../../polls-single-result-1572549447893.json';

const politician = require('./models/politician.js');
const poll = require('./models/poll');
const vote = require('./models/vote');
const event = require('./models/event');

async function start() {
	// Delete everything
	await event.query().delete();
	await vote.query().delete();
	await poll.query().delete();
	await politician.query().delete();

	console.log('All tables were truncated');

	// Read json and insert politicians
	const sourcePoliticians = require(pathPoliticians);
	const politiciansDb = await politician.query().insertGraph(sourcePoliticians);

	console.log('All politicians were inserted');
	// Read json and insert polls
	const sourcesPolls = require(pathPolls);
	const recordsPolls = sourcesPolls.map((poll) => {
		const newPoll = { ...poll };
		newPoll.votes = poll.votes.map((vote) => {
			const newVote = { ...vote };
			const currentPolitician = politiciansDb.find(
				(p) => p.slug === vote.politicianSlug,
			);
			if (currentPolitician) {
				newVote.politicianId = currentPolitician.id;
				return newVote;
			} else {
				throw new Error(`Not found politician ${vote.politicianSlug}`);
			}
		});
		delete newPoll.utcDate;
		return newPoll;
	});

	await poll.query().insertGraph(recordsPolls);
	console.log('All polls were inserted');
	console.log('Finish');
}

start();
