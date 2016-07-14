/**
 * Created by gbox3d on 15. 3. 20..
 */

    var module_path = '/usr/local/lib/node_modules/';

var SerialPort = require(module_path +"serialport").SerialPort;
var five = require(module_path + "johnny-five");

var board = new five.Board({
    port: new SerialPort("/dev/tty.usbmodem1d1151", {
        baudrate: 57600,
        buffersize: 1
    })
});

//var board = new five.Board({ port: "/dev/tty.usbmodem1d1151" });

board.on("ready", function() {

    // Create an Led on pin 13 and strobe it on/off
    // Optionally set the speed; defaults to 100ms
    (new five.Led(13)).strobe();

});
