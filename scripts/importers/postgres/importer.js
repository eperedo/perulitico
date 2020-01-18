require('./../postgres/connection');

const excelToJson = require('convert-excel-to-json');
const slug = require('slug');
const voteCode = require('./../constants/vote-code');
const voteTypeCode = require('./../constants/vote-type-code');

// models
const Politician = require('./../postgres/models/politician');
const Poll = require('./../postgres/models/poll');

async function readExcel({ excelPath, sheetName }) {
	const result = excelToJson({
		sourceFile: excelPath,
	});
	const sheetData = result[sheetName];

	validateTypeVotes(sheetData[0]);
	validateVoteValues(sheetData);
	const politicians = await validatePoliticians(sheetData);
	const pollsEntries = Object.entries(sheetData[1]);

	const polls = await validateAndCreatePolls(pollsEntries, {
		sheetData,
		politicians,
	});

	await Poll.transaction(async (trx) => {
		const pollInserted = await Poll.query(trx).insertGraph(polls);
		return pollInserted;
	});

	return result;
}

async function validateAndCreatePolls(data, { politicians, sheetData }) {
	const polls = [];

	for await (let row of data) {
		const [date, title] = row[1].split('---');
		const pollSlug = slug(title.trim().toLowerCase());

		const exist = await Poll.exist(null, { slug: pollSlug });

		if (!exist) {
			const totalValues = Object.keys(voteCode).reduce((acum, item) => {
				acum[`total${voteCode[item].key}`] = 0;
				return acum;
			}, {});
			const newPoll = {
				rawDate: String(date).trim(),
				slug: slug(title.trim().toLowerCase()),
				title: title.trim(),
				result: totalValues,
			};
			newPoll.votes = politicians.map((politician, index) => {
				const newVote = {
					politicianName: politician.fullName,
					politicianSlug: politician.slug,
					politicianParty: politician.party,
					politicianId: politician.id,
					// index + 2 because in excel the first politician is
					// in the third cell
					value: sheetData[index + 2][row[0]],
				};
				const voteConstant = voteCode[newVote.value.toUpperCase()];
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
			polls.push(newPoll);
		} else {
			console.log(`${title} already registered`);
		}
	}
	return polls;
}

async function validatePoliticians(data) {
	const politicians = [];
	let index = 0;
	for await (let row of data) {
		if (index > 1) {
			const isInDb = await Politician.existPolitician(null, {
				slug: slug(row.B.toLowerCase()),
			});
			if (isInDb) {
				const newRow = {
					id: isInDb.id,
					fullName: row.B,
					slug: slug(row.B.toLowerCase()),
					party: row.A,
				};
				politicians.push(newRow);
			} else {
				throw Error(`POLITICIAN NOT FOUND: ${row.B}`);
			}
		}
		index += 1;
	}
	return politicians;
}

function validateTypeVotes(data) {
	const typeVotes = Object.entries(data);
	typeVotes.forEach((vote) => {
		const typeVote = vote[1];
		const currentTypeVote = voteTypeCode[typeVote];
		if (!currentTypeVote) {
			throw new Error(`TYPE VOTE NOT FOUND: ${typeVote}`);
		}
	});
}

function validateVoteValues(data) {
	data.forEach((row, index) => {
		if (index > 1) {
			const rowValues = Object.values(row);
			rowValues.forEach((item, ir) => {
				if (ir > 1) {
					if (!voteCode[item.toUpperCase()]) {
						throw new Error(`VOTE NOT FOUND: ${item.toUpperCase()}`);
					}
				}
			});
		}
	});
}

async function importExcel(input) {
	readExcel(input);
	return [];
}

// const input = {
// 	excelPath: 'D:/coding/river-zero/congreso/scripts/templates/polls-2016.xlsx',
// 	sheetName: '2016',
// };

// const input = {
// 	excelPath: 'D:/coding/river-zero/congreso/scripts/templates/polls-2017.xlsx',
// 	sheetName: '2017',
// };

const input = {
	excelPath: 'D:/coding/river-zero/congreso/scripts/templates/polls-2018.xlsx',
	sheetName: '2018',
};

importExcel(input);
