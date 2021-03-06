/**
 * Created by gbox3d on 15. 5. 21..
 */

var async = require( '/usr/local/lib/node_modules/async');
var firmata = require("firmata");

console.log("blink start ...");

var digitalPin = 10;
var analogPin = 0;
var board;
async.waterfall([
        function(next) {
//var firmata = require("firmata");


            board = new firmata.Board("/dev/tty.usbmodem1d1151", function(err) {
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


            board.pinMode(digitalPin, board.MODES.INPUT);
            board.pinMode(analogPin, board.MODES.INPUT);


            board.digitalRead(digitalPin,function(value) {

                console.log('digital read : ' + value);
            });
            board.analogRead(analogPin,function(value) {

                console.log('analog read : ' + value);
            });


            next(null);
        }

    ],
    function(err,result) {

        if(!err) {
            console.log('all ok')

        }
    });