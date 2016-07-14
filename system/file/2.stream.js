/**
 * Created by gbox3d on 14. 11. 22..
 */

var fs = require('fs');

var file = fs.createReadStream('stream_test.txt', {flags: 'r'} );
var out = fs.createWriteStream('stream_out.txt', {flags: 'w'});
file.pipe(out);