/**
 * Created by gbox3d on 15. 1. 29..
 */
var i2c = require('i2c');
var address = 0x02;

var wire = new i2c(address, {device: '/dev/i2c-1'}); //첫번째 디아비스 오픈

// point to your i2c address, debug provides REPL interface

// i2c 네트워크내에서 어떤 디바이스가열려있는지 확인하고 번호를 배열로 보낸다.
wire.scan(function(err, data) {
    // result contains an array of addresses
    console.log(data);
});

wire.readBytes(0x00, 6, function(err, res) {
    // result contains a buffer of bytes
    console.log(res)
});
