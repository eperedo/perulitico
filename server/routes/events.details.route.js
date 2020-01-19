const EVENTS_PER_PAGE = 20;

const route = {
	handler: async (req) => {
		const { Vote } = req.models();
		const { politicianSlug } = req.params;
		const page = req.query.page || 0;
		const limit = req.query.limit || EVENTS_PER_PAGE;

		const events = await Vote.query()
			.select(
				'votes.voteLabel',
				'votes.politicianSlug',
				'votes.id',
				'polls.rawDate',
				'polls.title',
				'polls.slug',
			)
			.join('polls', 'polls.id', 'votes.pollId')
			.orderBy('polls.rawDate', 'asc')
			.where('politicianSlug', politicianSlug)
			.page(page, limit);

		return events.results.map((item) => {
			const newEvent = {
				id: item.id,
				description: `He marcado ${item.voteLabel} en la votación ${item.title}`,
				eventDate: item.rawDate,
				webSlug: item.slug,
				politicianId: item.politicianSlug,
			};

			return newEvent;
		});
	},
	method: 'GET',
	path: '/politicians/{politicianSlug}/{typeEvent}/events',
};

module.exports = route;
