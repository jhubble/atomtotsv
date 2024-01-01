Atom to TSV

Converts a Blogger feed.atom file or backup file to a tsv spreadsheet.

Requires node.js (incuding npm) to be installed
[https://nodejs.org/en/download/](https://nodejs.org/en/download/)
or using nvm
[https://nodejs.org/en/download/](https://nodejs.org/en/download/)

# Setup
1. After ensuring node is installed, clone repo
2. After cloning repo, install modules with:
	    ```npm install```

# To convert a blogger backup file:
1. Under blogger settings menu, click ```Backup Content``` abd download the backup
2. Convert the backup to tsv (replace inputfile.xml with the name of the downloaded file):
	    ```npm run backupToTsv inputfile.xml outputfile.tsv```

* If inputfile is not specified, it will default to feed.atom.
* If outputfile is not specified it will add tsv to the input file
* It extracts the path, date, title and tags

# To convert feed.atom file:
1. First copy feed.atom to the directory
2. Run:	    ```node index.js > output.tsv```

