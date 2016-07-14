/**
 * Created by gbox3d on 2014. 9. 16..
 */

// NOTE: the port is different
var host = "127.0.0.1", port = 33334;

var dgram = require( "dgram" );

var client = dgram.createSocket( "udp4" );

client.on( "message", function( msg, rinfo ) {
    console.log( "The packet came back" );
    console.log(msg);
});

// client listens on a port as well in order to receive ping
client.bind( port );

var message = new Buffer( "hello udp!" );
client.send(
    message, 0,
    message.length,
    //33333, "127.0.0.1" );
    33333, "192.168.219.9" );