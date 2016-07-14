/**
 * Created by gbox3d on 15. 3. 20..
 */


var five = require("johnny-five");

// or "./lib/johnny-five" when running from the source
var board = new five.Board({ port: "/dev/tty.usbmodem1d1151" });

// The board's pins will not be accessible until
// the board has reported that it is ready
board.on("ready", function() {
    this.pinMode(13, this.MODES.OUTPUT);

    this.loop(500, function() {
        // Whatever the last value was, write the opposite
        this.digitalWrite(13, this.pins[13].value ? 0 : 1);
    });
});