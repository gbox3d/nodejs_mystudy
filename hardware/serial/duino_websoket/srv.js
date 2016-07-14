/**
 * Created by gbox3d on 14. 11. 17..
 */

var http = require('http');
var util = require('util');
var fs = require('fs');
var os = require('os');
var UrlParser = require('url');

var WebSocketServer = require('../../../../../../node_pub/node_modules/websocket').server;
var serialport = require("../../../../../../node_pub/node_modules/serialport");

var theApp = {
    version : '0.1.1',
    module_path : '',
    port : 8080,
    revCallback : null,
    setup : function(option) {

        var That = this;
        this.serial = {};
        this.connection = {};

        //ls /dev | grep usb
        var serialPort = new serialport.SerialPort(
            "/dev/tty.usbmodem1a1271",
            {
                baudrate: option.baudrate
            }
        );

        serialPort.on("open", function () {

            console.log('open at baudrate :' + option.baudrate);

            //데이터 읽기
            serialPort.on('data', function(data) {
                for( var key in That.connection) {

                    That.connection[key].sendUTF(JSON.stringify( {
                            result : 'ok',
                            event : 'data',
                            data:data})
                    );

                }
            });


        });

        this.serial.object = serialPort;


        //http
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
        wsServer.on('request', (function(request) {

            var connection = request.accept(null, request.origin);

            console.log(connection.socket._peername);
            console.log('connect : ' + connection.remoteAddress);

            // This is the most important callback for us, we'll handle
            // all messages from users here.
            connection.on('message', function(message) {
                if (message.type === 'utf8') {
                    // process WebSocket message
                    console.log(message);

                    var msg = JSON.parse(message.utf8Data);

                    serialPort.write(msg.code, function(err, results) {
                        if(err) {
                            console.log('err ' + err);
                        }

                        console.log('results ' + results);
                    });

                    /*
                    connection.sendUTF(
                        JSON.stringify( {
                            result : 'ok',
                            msg:'echo back :' + message.utf8Data})
                    );
                    */

                }
            });

            connection.on('close', function(reasonCode, description) {
                // close user connection
                //console.log(connection);

                console.log('close :' + connection.peer_idhandle);
                That.connection[connection.peer_idhandle] = null;

                delete That.connection[connection.peer_idhandle];

                console.log(That.connection);

            });

            connection.peer_idhandle = connection.socket._peername.address + ':' +connection.socket._peername.port;

            this.connection[connection.peer_idhandle] = connection;
            //console.log(That.connection);

            setTimeout(function() {
                connection.sendUTF(JSON.stringify( {result : 'ok',event : 'welcome',msg:'connected!'}));
            },3000);


        }).bind(this));

    }
};

(theApp.setup.bind(theApp))({
    baudrate : 9600
});


