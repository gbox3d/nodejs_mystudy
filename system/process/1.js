/**
 * Created with JetBrains WebStorm.
 * User: gbox3d
 * Date: 13. 4. 27.
 * Time: 오후 1:54
 * To change this template use File | Settings | File Templates.
 */


var exec = require('child_process').exec;
var child = exec('ls -la', function(err, stdout, stderr) {
    if (err) throw err;
    else console.log(stdout);
});