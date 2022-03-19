const dgram = require("dgram");
const udp_socket = dgram.createSocket("udp4");

udp_socket.on("message", function (msg, rinfo) {
    console.log(rinfo)
    console.log(msg)
    // console.log(msg.toString())
})

function loop() {

    let ip = '113.61.2.36'
    let port = 41716
    //113.61.2.36:42529

    let _data = 'hello p2p'
    let resBuf = Buffer.alloc(8 + _data.length)

    resBuf.writeInt32LE(888, 0);
    resBuf.writeUInt8(1, 4); //ready to fire
    resBuf.write(_data, 8)

    console.log('send')

    udp_socket.send(Buffer.from(resBuf), 0, resBuf.length, port, ip); // added missing bracket

    setTimeout(loop, 3000);
}

loop();
