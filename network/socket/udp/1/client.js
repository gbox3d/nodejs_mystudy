/**
 * Created by gbox3d on 2014. 9. 16..
 */

// NOTE: the port is different
// var host = "127.0.0.1"
var remote = {
    host : "127.0.0.1",
    port : 33333

}

var dgram = require( "dgram" );

var client = dgram.createSocket( "udp4" );

client.on( "message", function( msg, rinfo ) {
    console.log( "The packet came back" );
    console.log(msg.toString());
    console.log(rinfo)
});

// client listens on a port as well in order to receive ping
client.bind(); //포트를 특정하지 않으면 모든 포트의 데이터를 받는다.

var message = new Buffer.from( "hello udp!" );
client.send(
    message, 0,
    message.length,
    remote.port, remote.host );