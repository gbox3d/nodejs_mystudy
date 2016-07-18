/**
 * Created by gbox3d on 2014. 9. 16..
 */
//var host = "127.0.0.1", port = 33333;
//var host = "192.168.219.9", port = 33333;


var dgram = require( "dgram" );

var server = dgram.createSocket( "udp4" );

var remote_client;
var port = 33333;
server.on( "message", function( msg, rinfo ) {

    remote_client = rinfo;

    console.log(rinfo);
    console.log(msg);

    server.send(
        msg, 0, msg.length,
        rinfo.port, rinfo.address ); // added missing bracket
});
server.bind( port );


////////////////
//
process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');

process.stdin.on('data', function (text) {
    console.log('received data:', util.inspect(text));

    var strText = text;

    server.send(
        Buffer(text), 0, text.length,
        remote_client.port, remote_client.address ); // added missing bracket



    if (text === 'quit\n') {
        done();
    }
});

function done() {
    console.log('Now that process.stdin is paused, there is nothing more to do.');
    process.exit();
}