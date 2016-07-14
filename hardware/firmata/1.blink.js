/**
 * Created by gbox3d on 15. 3. 20..
 */

var async = require( '/usr/local/lib/node_modules/async');
var firmata = require("firmata");

console.log("blink start ...");

var ledPin = 13;
var board;
async.waterfall([
        function(next) {
//var firmata = require("firmata");


            board = new firmata.Board(
                //"/dev/tty.usbserial",
                "/dev/tty.usbmodem1d1171",
                function(err) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("connected");

                console.log("Firmware: " + board.firmware.name + "-" +
                board.firmware.version.major + "." + board.firmware.version.minor);

                next(null);

            });


        },
        function(next) {

            var ledOn = true;
            board.pinMode(ledPin, board.MODES.OUTPUT);

            setInterval(function() {

                if (ledOn) {
                    console.log("+");
                    board.digitalWrite(ledPin, board.HIGH);
                } else {
                    console.log("-");
                    board.digitalWrite(ledPin, board.LOW);
                }

                ledOn = !ledOn;

            }, 500);


            next(null);
        }

    ],
    function(err,result) {

        if(!err) {
            console.log('all ok')

        }
    });