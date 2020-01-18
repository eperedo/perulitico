const { readFileSync, writeFileSync } = require('fs');
const excelToJson = require('convert-excel-to-json');
const slug = require('slug');
const { voteValues } = require('./constants');

function getPoliticians() {
	const politicians = readFileSync('./politicians.json', { encoding: 'UTF-8' });
	return JSON.parse(politicians);
}

let pollId = 1;
const singleResult = [];
const politicians = getPoliticians();

function generatePoll(csvFilePath, sheetName) {
	const result = excelToJson({
		sourceFile: csvFilePath,
	});
	const pollsSheet = result[sheetName];
	const pollsEntries = Object.entries(pollsSheet[1]);
	const polls = pollsEntries.map((item, index) => {
		const [date, title] = item[1].split('---');
		// const pollId = index + 1;
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
			result: totalValues,
		};
		newPoll.votes = politicians.map((politician, index) => {
			const newVote = {
				politicianName: politician.fullName,
				politicianSlug: politician.slug,
				pollId,
				// index + 2 because in excel the first politician is
				// in the third cell
				value: pollsSheet[index + 2][item[0]],
			};
			const voteConstant = voteValues[newVote.value.toUpperCase()];
			if (voteConstant) {
				const totalLabel = `total${voteConstant.key}`;
				newVote.voteColor = voteConstant.color;
				newVote.voteLabel = voteConstant.label;
				newPoll.result[totalLabel] += 1;
			} else {
				console.log(
					`Cannot found "${newVote.value}" value in poll ${newPoll.title}`,
				);
			}
			return newVote;
		});
		pollId += 1;
		return newPoll;
	});
	singleResult.push(...polls);
	writeFileSync(
		`polls-${sheetName}-${new Date().getTime()}.json`,
		JSON.stringify(polls, null, ' '),
	);
}

generatePoll('./templates/polls-2016.xlsx', '2016');
generatePoll('./templates/polls-2017.xlsx', '2017');

writeFileSync(
	`polls-single-result-${new Date().getTime()}.json`,
	JSON.stringify(singleResult, null, ' '),
);
