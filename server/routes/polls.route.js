const route = {
	handler: async (req, h) => {
		const { Poll } = req.models();
		const { search, date } = req.query;

		const query = Poll.query()
			.select('id', 'title', 'slug', 'rawDate', 'result', 'created_at')
			.whereRaw('to_tsvector(?, title) @@ to_tsquery(?, ?)', [
				'spanish',
				'spanish',
				search,
			])
			.orderBy('rawDate', 'desc');

		if (date) {
			query.whereRaw('DATE("rawDate") >= ? and DATE("rawDate") <= ?', [
				date,
				date,
			]);
		}

		const polls = await query;

		return polls;
	},
	method: 'GET',
	path: '/polls',
};

module.exports = route;
