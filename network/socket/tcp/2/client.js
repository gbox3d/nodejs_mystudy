/**
 * Created by gbox3d on 2014. 7. 22..
 */

var net = require('net');

var HOST = 'localhost';//'127.0.0.1';
var PORT = 8060;



var client = new net.Socket();
client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);


    client.write('android-01','utf-8',function() {

        console.log('로그인');

    });



});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {

    console.log('DATA: ' + data);

    // Close the client socket completely
    //client.destroy();

});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});