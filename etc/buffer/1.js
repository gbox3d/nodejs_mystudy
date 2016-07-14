/**
 * Created by gunpower on 2016. 5. 17..
 */


const buf = Buffer(8);
buf.writeInt32BE(0x01020304,0);
buf.writeInt32LE(0x05060708,4);
console.log(buf);