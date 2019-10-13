const { writeFileSync } = require('fs');
const slug = require('slug');
const csvtojsonV2 = require('csvtojson');

const csvFilePath = './templates/votes.csv';

csvtojsonV2()
	.fromFile(csvFilePath)
	.then((jsonObj) => {
		const politicians = jsonObj
			.map((item) => {
				const newPolitician = {
					fullName: item['field2'],
					slug: slug(item['field2']).toLowerCase(),
				};
				return newPolitician;
			})
			.filter((p) => Boolean(p.slug));
		writeFileSync('politicians.json', JSON.stringify(politicians, null, ' '));
	});
