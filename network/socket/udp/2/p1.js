/**
 * Created by gbox3d on 2014. 9. 17..
 */
//var host = "127.0.0.1", port = 33333;
var host = "localhost", port = 33333;

var remote = {
    //address : '192.168.0.9',
    address : 'localhost',
    port : 33334
}


var dgram = require( "dgram" );

var udp_socket = dgram.createSocket( "udp4" );

//var remote_client;
/*

udp 는 리스하는 과정이 없다. 연결시작 종료 개념이 없이 바로 데이터 보내고 받는식이다.

open , close 개념이 없다.

* */

udp_socket.on( "message", function( msg, rinfo ) {

    console.log( rinfo.address + ':' + rinfo.port + ' - ' + msg );

    //remote_client = rinfo;

    udp_socket.send( Buffer([0x02,0x03]), 0,2, rinfo.port, rinfo.address ); // added missing bracket
});
udp_socket.bind( port );


////////////////
//
//process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');
//process.stdin.setRa setRawMode(true);

process.stdin.on('data', function (text) {
    //console.log('received data:', util.inspect(text));

    var strText = text;

    udp_socket.send( Buffer(text), 0, text.length, remote.port, remote.address ); // added missing bracket

});
