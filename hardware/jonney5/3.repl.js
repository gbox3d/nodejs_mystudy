/**
 * Created by gbox3d on 15. 3. 20..
 */

var five = require("/usr/local/lib/node_modules/johnny-five");
// or "./lib/johnny-five" when running from the source
var board = new five.Board({ port: "/dev/tty.usbmodem1d1151" });
//var board = new five.Board();

board.on("ready", function() {
    console.log("Ready event. Repl instance auto-initialized!");

    var led = new five.Led(13);

    this.repl.inject({
        // Allow limited on/off control access to the
        // Led instance from the REPL.
        on: function() {
            led.on();
        },
        off: function() {
            led.off();
        },
        led : led
    });
});


/*

on();
off();

or
led.on();
led.off();


 */