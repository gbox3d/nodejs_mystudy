/**
 * Created by gbox3d on 2014. 2. 28..
 */

////////////////////////초미니 정적 웹서버
var connect = require("../../../../../node_pub/node_modules/connect");

var theApp = {
    port :8080
}

//command line argument parse
process.argv.forEach(function(val, index, array) {
    //console.log(index + ': ' + val);

    if(val.indexOf('=') > 0) {

        var tokens = val.split('=');

        if(tokens[0] == 'port') {
            theApp.port = parseInt(tokens[1])
        }

    }


});

var custom_port = process.argv[2];

connect.createServer(connect.static(__dirname)).listen(theApp.port);
console.log('start static webserver at '+ theApp.port)

