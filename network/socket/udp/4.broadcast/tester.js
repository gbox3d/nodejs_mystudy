/**
 * Created by gunpower on 2016. 6. 20..
 */

var dgram = require( "dgram" );

var client = dgram.createSocket( "udp4" );
var port = 33333;

client.on( "message", function( msg, rinfo ) {
    console.log( "The packet came back" );
    console.log(rinfo)
    console.log(msg.toString());
});

// client listens on a port as well in order to receive ping
client.bind( port );