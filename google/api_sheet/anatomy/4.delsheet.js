const myautho = require('./autho')
var google = require('googleapis');
var readline = require('readline');
const sheets = google.sheets('v4');

myautho.DoAuthorize((auth) => {
    if (auth != null) {
        console.log('ok')

        let rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('Enter sheetId to Del : ', (_) => {
            rl.close();
            console.log(_)
            sheets.spreadsheets.batchUpdate({
                auth: auth,
                spreadsheetId: '19BODI1yuVymEHXHAD6CvJ6pKbCQX39cGemKUl2A89-8',
                resource: {
                    requests: [{
                        deleteSheet: {
                            sheetId: _
                        }
                    }]
                }

            }, (err, response) => {
                if (err) {
                    console.log('The API returned an error: ' + err);
                    return;
                }
                console.log(response)
            });


        });
    } else {

    }
})