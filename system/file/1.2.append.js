/**
 * Created by gbox3d on 14. 11. 22..
 */

var fs = require('fs');

var current_data = (new Date());

fs.appendFileSync('test_append.json',',append :' + current_data.toTimeString() + '/' + current_data.toDateString(),{
    encoding : 'utf8'
});