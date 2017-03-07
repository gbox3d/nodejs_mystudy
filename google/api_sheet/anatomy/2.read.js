const myautho = require('./autho')
var google = require('googleapis');
const sheets = google.sheets('v4');

myautho.DoAuthorize((auth) => {
    if (auth != null) {
        console.log('ok')

        sheets.spreadsheets.values.get({
            auth: auth,
            spreadsheetId: '19BODI1yuVymEHXHAD6CvJ6pKbCQX39cGemKUl2A89-8',
            majorDimension: "ROWS", //COLUMNS
            range: 'sheet1!A1:E4',
        }, function(err, response) {
            if (err) {
                console.log('The API returned an error: ' + err);
                return;
            }
            console.log(response)
        });



    } else {

    }
})