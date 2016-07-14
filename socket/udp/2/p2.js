/**
 * Created by gbox3d on 2014. 9. 17..
 */
var host = "127.0.0.1", port = 33334;

var remote = {
    address : '127.0.0.1',
    port : 33333
}


var dgram = require( "dgram" );

var udp_socket = dgram.createSocket( "udp4" );

//var remote_client;

udp_socket.on( "message", function( msg, rinfo ) {

    console.log( rinfo.address + ':' + rinfo.port + ' - ' + msg );

    //if(msg[0] == 99) {
    //    console.log('receive client');
   // }

    //remote_client = rinfo;
    //udp_socket.send( Buffer([0x02,0x03]), 0,2, rinfo.port, rinfo.address ); // added missing bracket
});
udp_socket.bind( port, host );


////////////////
//
process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');

process.stdin.on('data', function (text) {
    //console.log('received data:', util.inspect(text));

    var strText = text;

    udp_socket.send( Buffer(text), 0, text.length, remote.port, remote.address ); // added missing bracket

});
