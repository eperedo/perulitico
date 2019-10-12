const { readFileSync, writeFileSync } = require('fs');
const excelToJson = require('convert-excel-to-json');
const slug = require('slug');

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
	const pollsSheet = result['Hoja2'];
	const pollsEntries = Object.entries(pollsSheet[1]);
	const polls = pollsEntries.map((item, index) => {
		const [date, title] = item[1].split('---');
		const pollId = index + 1;
		const newPoll = {
			id: pollId,
			rawDate: String(date).trim(),
			slug: slug(title.trim().toLowerCase()),
			title: title.trim(),
			utcDate: new Date(String(date).trim()),
			votes: politicians.map((politician, index) => {
				const newVote = {
					politicianId: politician.slug,
					pollId,
					// index + 2 because in excel the first politician is
					// in the third cell
					value: pollsSheet[index + 2][item[0]],
				};
				return newVote;
			}),
		};
		return newPoll;
	});
	writeFileSync('polls.json', JSON.stringify(polls, null, ' '));
}

generatePoll();
