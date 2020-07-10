
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
    var message = new Buffer( JSON.stringify({msg : 'hello udp'}) );
    client.send(message, 0, message.length, 2012, "192.168.0.255");

    console.log('send udp');

    setTimeout(loop,1000);

}

