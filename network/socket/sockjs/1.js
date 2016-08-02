/**
 * Created by gbox3d on 2014. 5. 29..

 npm install sockjs

 */

var theApp = {
    version: '0.0.2',
    module_path: '/usr/local/lib/node_modules/'
}
var http = require('http');
var sockjs = require(theApp.module_path +  'sockjs');

var echo = sockjs.createServer();
echo.on('connection', function(conn) {


    conn.write('welcome!');


    conn.on('data', function(message) {

        conn.write(message);


    });
    conn.on('close', function() {

        console.log('connection closed');

    });
});

var server = http.createServer();
echo.installHandlers(server, {prefix:'/echo'});
server.listen(9999, '0.0.0.0');