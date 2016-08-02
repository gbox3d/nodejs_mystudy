/**
 * Created by gbox3d on 2014. 6. 6..
 */
var net = require('net');

//var HOST = '127.0.0.1';
//var PORT = 8081;

var HOST = '192.168.9.108';
var PORT = 8070;


var client = new net.Socket();
client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);

    //client.write('I am Chuck Norris!');
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client

    client.write('hello~!');
    client.write('한글','utf-8',function() {

        console.log();

    });

    //안드로이드 소켓통신할때는 개행문자가 필요한 경우도 있다.
    client.write('\n','utf-8',function() {

        console.log('개행 문자 전송');

    });



});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {

    console.log('DATA: ' + data);
    // Close the client socket completely
    client.destroy();

});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});