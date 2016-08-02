/**
 * Created by gbox3d on 2014. 9. 12..


 npm install websocket

 */



var WebSocketServer = require('/usr/local/lib/node_modules/websocket').server;
var WebSocketConnection = require('/usr/local/lib/node_modules/websocket').connection;
var http = require('http');

var server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets server
    // we don't have to implement anything.
});
server.listen(1337, function() {
    console.log('start listen 1337');

});

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {

    var connection = request.accept(null, request.origin);

    console.log('connect : ' + connection.remoteAddress);

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            // process WebSocket message
            console.log(message);

            connection.sendUTF(
                JSON.stringify( {
                    result : 'ok',
                    type : 'echo',
                    msg:'echo back :' + message.utf8Data})
            );

            //연결 종료..
            connection.close(WebSocketConnection.CLOSE_REASON_NORMAL,'test complete');

        }
    });

    connection.on('close', function(reasonCode,description) {
        // close user connection
        console.log('close :' + reasonCode + ',' + description);

    });

    setTimeout(function() {

        connection.sendUTF(JSON.stringify( {result : 'ok',type : 'welcome',msg : 'connection success!'}));

    },3000);


});