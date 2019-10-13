const { readFileSync, writeFileSync } = require('fs');
const excelToJson = require('convert-excel-to-json');
const slug = require('slug');
const { voteValues } = require('./constants');

const csvFilePath = './templates/polls.xlsx';

function getPoliticians() {
	const politicians = readFileSync('./politicians.json', { encoding: 'UTF-8' });
	return JSON.parse(politicians);
}

function generatePoll() {
	const politicians = getPoliticians();
	const result = excelToJson({
		sourceFile: csvFilePath,
	});
	const pollsSheet = result['Hoja 1'];
	const pollsEntries = Object.entries(pollsSheet[1]);
	const polls = pollsEntries.map((item, index) => {
		const [date, title] = item[1].split('---');
		const pollId = index + 1;
		const totalValues = Object.keys(voteValues).reduce((acum, item) => {
			acum[`total${voteValues[item].key}`] = 0;
			return acum;
		}, {});
		const newPoll = {
			id: pollId,
			rawDate: String(date).trim(),
			slug: slug(title.trim().toLowerCase()),
			title: title.trim(),
			utcDate: new Date(String(date).trim()),
			...totalValues,
		};
		newPoll.votes = politicians.map((politician, index) => {
			const newVote = {
				politicianId: politician.slug,
				pollId,
				// index + 2 because in excel the first politician is
				// in the third cell
				value: pollsSheet[index + 2][item[0]],
			};
			const voteConstant = voteValues[newVote.value.toUpperCase()];
			if (voteConstant) {
				const totalLabel = `total${voteConstant.key}`;
				newPoll[totalLabel] += 1;
			}
			return newVote;
		});

		return newPoll;
	});
	writeFileSync('polls.json', JSON.stringify(polls, null, ' '));
}

generatePoll();
