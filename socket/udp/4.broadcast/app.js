/**
 * Created by gunpower on 2016. 6. 20..
 */
var dgram = require( "dgram" );
var client = dgram.createSocket("udp4");

client.bind(
    function() {
        console.log('udp bind success');
        client.setBroadcast(true);
        loop();
    }
);

function loop() {
    var message = new Buffer( "hello udp!" );
    client.send(message, 0, message.length, 33333, "192.168.9.255");

    console.log('send udp');

    setTimeout(loop,1000);

}

