const dgram = require( "dgram" );
const server = dgram.createSocket( "udp4" );

server.on( "message", function( msg, rinfo ) {

    console.log(rinfo)
    console.log(msg)

    let _pkt = JSON.stringify({r:'ok',d:rinfo})

    server.send(_pkt,0,_pkt.length,rinfo.port,rinfo.address)

});

let port = 8060

if(process.argv.length >= 3) {
    port = parseInt( process.argv[2] )
}

server.bind( port );

console.log(`bind at ${port}`)

////////////------------------//////////////////////
var repl = require('repl')

var theApp = {
    testMsg: 'hello repl',
    udp_socket: server
}

theApp.sendText = (ip, port, msg) => {
    theApp.udp_socket.send(Buffer.from(msg), 0, msg.length, port, ip); // added missing bracket
}

var repl_context = repl.start({
    prompt: 'Node.js via stdin> ',
    input: process.stdin,
    output: process.stdout
}).context;

//콘텍스트객체 설정
//theApp을 repl에서 볼수있다
repl_context.theApp = theApp;