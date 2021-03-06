var parseString = require('xml2js').parseString;
var fs = require('fs');

var xml = fs.readFileSync('feed.atom','UTF-8');

console.log("TITLE\tPUBLISHED\tFILENAME\tTAGS");
parseString(xml, function (err, result) {
    result.feed.entry.forEach(entry => {
        if (!entry.title || !entry.title[0]) {
                return;
        }
        let string = entry.title[0]+'\t'   
                        // strip date so spreadsheets can easily format
                   + `${entry.published[0]}`.replace(/T.+/,'')+'\t'
                        // actually the first array entry, but we magically get what we want in the console
                   + entry['blogger:filename']+'\t'
                   + parseCategory(entry.category);
        console.log(string);
    });

});

function parseCategory (categories) {
        if (!categories) {
                return "";
        }
        var cats = categories.map(cat => {
                return cat['$'].term;
        }).join(',');
        return cats;
}

