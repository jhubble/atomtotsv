Atom to TSV

Converts a Blogger feed.atom file to a tsv spreadsheet.

To use. First copy feed.atom to the directory

Require node.js (incuding npm) to be installed
[https://nodejs.org/en/download/](https://nodejs.org/en/download/)
or using nvm
[https://nodejs.org/en/download/](https://nodejs.org/en/download/)


After cloning repo, install modules with:
	npm install

1. To convert an feed.atom file, run:
	node index.js > output.tsv

2. Under blogger settings menu, you can output a backup. After doing that, you can convert it to tsv:
	npm run backupToTsv inputfile.xml outputfile.tsv

If inputfile is not specified, it will default to feed.atom.
If outputfile is not specified it will add tsv to the input file
It extracts the path, date, title and tags
