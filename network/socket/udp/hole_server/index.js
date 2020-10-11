const dgram = require( "dgram" );
const server = dgram.createSocket( "udp4" );

server.on( "message", function( msg, rinfo ) {

    console.log(rinfo)
    console.log(msg)

});

let port = 8060

if(process.argv.length >= 3) {
    port = parseInt( process.argv[2] )
}

server.bind( port );

console.log(`bind at ${port}`)