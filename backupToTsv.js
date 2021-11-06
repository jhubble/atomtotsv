var parseString = require('xml2js').parseString;
var fs = require('fs');

const inputFile = process.argv[2] || 'feed.atom';
const outputFile = process.argv[3] || inputFile + '.tsv';

console.info(`input file: ${inputFile}, output file: ${outputFile}`);
var xml = fs.readFileSync(inputFile,'UTF-8');

const lines = [];
parseString(xml, function (err, result) {
	result.feed.entry.forEach(entry => {
		if (!entry.title || !entry.title[0]) {
			return;
		}
		const title = entry.title[0]['_'];
		const published = `${entry.published[0]}`.replace(/T.+/,'');
		let type = '';
		let labels = [];
		let href = '';
		if (entry.category) {
			entry.category.forEach(category => {
				const scheme = category?.['$']?.scheme;
				const term = category?.['$']?.term;
				if (scheme === 'http://www.blogger.com/atom/ns#') {
					labels.push(term);
				}
				if (scheme === 'http://schemas.google.com/g/2005#kind') {
					type = term.replace(/^.*#/,'');
				}
			});
		}
		if (entry.link) {
			entry.link.forEach(link => {
				if (link?.['$']?.rel === 'alternate') {
					href = link['$'].href;
				}
			});
		}



		if (type === 'post') {

			const output = `${title}\t${published}\t${href}\t${labels.join(',')}`;
			lines.push(output);
		}
	});

});

const header = "TITLE\tPUBLISHED\tFILENAME\tTAGS\n"
//lines.reverse().map(line => console.log(line));

fs.writeFileSync(outputFile, header+lines.reverse().join('\n'));
