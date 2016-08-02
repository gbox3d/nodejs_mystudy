/**
 * Created by gbox3d on 2014. 7. 22..
 */


var net = require('net');
var http = require('http');
var fs = require('fs');
var UrlParser = require('url');

//현제 할당받은 주소를 써준다..
//var HOST = '192.168.0.7';
var net_PORT = 8060;
var http_PORT = 8080;

var theApp = {

    connection : {

    }

};

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {

    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);


    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {

        console.log('login : ' + sock.remoteAddress + ': ' + data);

        var str_id = String(data);

        theApp.connection[str_id.replace(/\n/g,"")] = sock;

    });

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ');

    });

}).listen(net_PORT);

console.log('Server listening on ' +  net_PORT);


http.createServer(function (req, res) {

    try {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('remote address:' + ip);

    }
    catch(e)
    {
        console.log(e);

    }


    if(req.url != '/favicon.ico') {

        var result = UrlParser.parse(req.url,true);

        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Max-Age': '1000'
        });

        switch(result.pathname) {
            case "/test":
                res.write(JSON.stringify({status : 'ok'}));

                //console.log(theApp.connection);

                if(theApp.connection['android-01'] != undefined) {

                    console.log("send android : ..");

                    theApp.connection['android-01'].write("test");
                }
                break;
            default:
                res.write("usage : [echo|save|load]");
                break;
        }

        res.end();
    }
    else {
        res.writeHead(404);
        res.end();
    }


}).listen(http_PORT);


console.log('Server running at : ' + http_PORT);
