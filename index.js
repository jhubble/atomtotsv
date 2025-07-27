var parseString = require('xml2js').parseString;
var fs = require('fs');
var process = require('process')

var blogUrl = process.argv[2] || '';
var xml = fs.readFileSync('feed.atom','UTF-8');

console.log("TITLE\tPUBLISHED\tFILENAME\tTAGS");
parseString(xml, function (err, result) {
    result.feed.entry.filter(entry => { return entry?.['blogger:type']?.[0] === 'POST' && entry?.['blogger:status']?.[0] === 'LIVE' })
		.sort((a,b)=> {return a.published[0].localeCompare(b.published[0])})
		.forEach(entry => {
	    /*
        if (!entry.title || !entry.title[0]) {
                return;
        }*/
        let string = entry.title[0]+'\t'   
                        // strip date so spreadsheets can easily format
                   + `${entry.published[0]}`.replace(/T.+/,'')+'\t'
                        // actually the first array entry, but we magically get what we want in the console
                   + blogUrl + entry['blogger:filename']+'\t'
                   + parseCategory(entry.category);
        console.log(string);
    });

});

function parseCategory (categories) {
        if (!categories) {
                return "";
        }
        var cats = categories.map(cat => {
                return cat['$']?.term;
        }).join(',');
        return cats;
}

