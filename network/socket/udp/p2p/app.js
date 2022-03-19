
let host = "127.0.0.1", port = 33333;


let remote = {
    address : '127.0.0.1',
    port : 33334
}


const dgram = require( "dgram" );
const udp_socket = dgram.createSocket( "udp4" );

//var remote_client;

udp_socket.on( "message", function( msg, rinfo ) {

    console.log( rinfo.address + ':' + rinfo.port + ' - ' + msg );
});
udp_socket.bind( port, host );


////////////////
//
process.stdin.resume();
process.stdin.setEncoding('utf8');
const util = require('util');

process.stdin.on('data', function (text) {
    var strText = text;
    udp_socket.send( Buffer(text), 0, text.length, remote.port, remote.address ); // added missing bracket

});

console.log("start p2p(udp) tester at :" + port);