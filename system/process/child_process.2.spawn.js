/**
 * Created by gbox3d on 15. 7. 22..
 */

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

// execute curl using child_process' spawn function
var curl = spawn('ls', ['-al']);
// add a 'data' event listener for the spawn instance
curl.stdout.on('data', function(data) { console.log(data.toString()) });
// add an 'end' event listener to close the writeable stream
curl.stdout.on('end', function(data) {

    console.log('stream end.')
    //file.end();
    //console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
});
// when the spawn child process exits, check if there were any errors and close the writeable stream
curl.on('exit', function(code) {
    if (code != 0) {
        console.log('Failed: ' + code);
    }
});