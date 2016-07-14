/**
 * Created by gbox3d on 15. 1. 12..
 */

var i2c = require('i2c');
var address = 0x02;

var wire = new i2c(address, {device: '/dev/i2c-1'}); //첫번째 디아비스 오픈
var wire3 = new i2c(0x03, {device: '/dev/i2c-1'}); //두번째 디바이스오픈
// point to your i2c address, debug provides REPL interface

// i2c 네트워크내에서 어떤 디바이스가열려있는지 확인하고 번호를 배열로 보낸다.
wire.scan(function(err, data) {
    // result contains an array of addresses
    console.log(data);
});

/*
 //지정된 디바이스 번호에서 한바이트 읽는다.
 wire.readByte(function(err, res) {
 });
 */


setInterval(function () {

    wire.readBytes(0x00, 6, function(err, res) {
        // result contains a buffer of bytes
        console.log(res)
    });

    wire3.readBytes(0x00, 6, function(err, res) {
        // result contains a buffer of bytes
        console.log(res)
    });
},50);

/*

 //첫번째인자는 기기가 정한 커멘드값, 특별한 값이 없으면 0을 넣는다.
 //두번째인자는 얻어올바이트값(한번통신시 받아오는값) , 이예제는 6바이트만큼 얻는다.

 wire.readBytes(0x00, 6, function(err, res) {
 // result contains a buffer of bytes
 console.log(res)
 });

 wire3.readBytes(0x00, 6, function(err, res) {
 // result contains a buffer of bytes
 console.log(res)
 });
 */

/*

//주기적으로 계속 데이터를 받는다. 두개 이상 연속으로 지정하면 안되는거같다. 두개를 번갈아 받아올려면 타이버로 하나씩 읽어들인다.
 wire.on('data', function(data) {
 console.log(data);
 });

 wire.stream(0x00, 6, 500); // continuous stream, delay in ms


 */

