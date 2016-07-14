/**
 * Created by gbox3d on 15. 3. 20..
 */

var five = require("/usr/local/lib/node_modules/johnny-five");
// or "./lib/johnny-five" when running from the source
var board = new five.Board({ port: "/dev/tty.usbmodem1d1151" });

board.on("ready", function() {

    // Create an Led on pin 13 and strobe it on/off
    // Optionally set the speed; defaults to 100ms
    (new five.Led(13)).strobe();

});

/*
var ports = [
    { id: "A", port: "/dev/cu.usbmodem1d1151" },
    { id: "B", port: "/dev/cu.usbmodem411" }
];
    */