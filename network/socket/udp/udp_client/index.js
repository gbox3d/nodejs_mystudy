/**
 * Created by gbox3d on 15. 6. 15..
 */
const dgram = require("dgram");
const udp_socket = dgram.createSocket("udp4");

udp_socket.on("message", function (msg, rinfo) {
    console.log(rinfo)
    console.log(msg);
    //remote_client = rinfo;
    //udp_socket.send( Buffer([0x02,0x03]), 0,2, rinfo.port, rinfo.address ); // added missing bracket
    // let resBuf = Buffer('ok')
    // udp_socket.send(resBuf , 0,resBuf.length, remote.port ,remote.address)
})

if(process.argv.length >= 3) {
    local.port = parseInt(process.argv[2])
}

if (local.port > 0) {
    udp_socket.bind(local.port);
    console.log(`bind at ${local.port}`);
}

////////////------------------//////////////////////
var repl = require('repl')

var theApp = {
    testMsg: 'hello repl',
    udp_socket: udp_socket
}

theApp.sendText = (ip, port, msg) => {
    udp_socket.send(Buffer(msg), 0, 2, port, ip); // added missing bracket
}

var repl_context = repl.start({
    prompt: 'Node.js via stdin> ',
    input: process.stdin,
    output: process.stdout
}).context;

//콘텍스트객체 설정
//theApp을 repl에서 볼수있다
repl_context.theApp = theApp;


/*
 theApp.udp_socket.send( Buffer('hi'), 0,2,1471,'192.168.9.20')

setInterval(function() {
    console.log('pung');
    udp_socket.send( Buffer('hi'), 0,2, remote.port ,remote.address); // added missing bracket
},1000)


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

*/
