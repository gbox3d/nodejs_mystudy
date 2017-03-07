const myautho = require('./autho')
var google = require('googleapis');
const sheets = google.sheets('v4');

myautho.DoAuthorize((auth) => {
    if (auth != null) {
        console.log('ok')

        //메뉴얼에 나와있는 request 값은 resource 에 넣어서 전달한다.
        sheets.spreadsheets.batchUpdate({
            auth: auth,
            spreadsheetId: '19BODI1yuVymEHXHAD6CvJ6pKbCQX39cGemKUl2A89-8',
            resource: {
                requests: [{
                    addSheet: {
                        "properties": {
                            "title": "Deposits",
                            "gridProperties": {
                                "rowCount": 20,
                                "columnCount": 12
                            },
                            "tabColor": {
                                "red": 1.0,
                                "green": 0.3,
                                "blue": 0.4
                            }
                        }
                    }
                }]
            }

        }, (err, response) => {
            if (err) {
                console.log('The API returned an error: ' + err);
                return;
            }
            console.log(response)
            console.log(response.replies[0].addSheet)
            console.log(response.replies[0].addSheet.properties.sheetId)
        });



    } else {

    }
})