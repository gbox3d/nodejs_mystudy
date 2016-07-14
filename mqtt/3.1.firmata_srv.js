/**
 * Created by gbox3d on 15. 5. 19..
 */

var async = require( '/usr/local/lib/node_modules/async');
var firmata = require("../hardware/firmata/node_modules/firmata");

var theApp = {};

var mqtt    = require('mqtt');



async.waterfall(
    [
        function(next) {

            var ledPin = 13;


            var board = new firmata.Board("/dev/tty.usbmodem1d1141", function(err) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("connected");

                console.log("Firmware: " + board.firmware.name + "-" + board.firmware.version.major + "." + board.firmware.version.minor);

                var ledOn = true;
                board.pinMode(ledPin, board.MODES.OUTPUT);

                theApp.board = board;
                theApp.ledPin = ledPin;

                next(null);

            });

        },
        function(next) {


            var client  = mqtt.connect('mqtt://goorume.cafe24.com');


            client.on('connect', function () {

                console.log('mqtt connect ok');
                client.subscribe('firmata');

            });

            client.on('message', function (topic, message) {

                console.log(message.toString());

                if( message.toString() == 'led-on') {

                    theApp.board.digitalWrite(theApp.ledPin, theApp.board.HIGH);

                }
                else if( message.toString() == 'led-off') {
                    theApp.board.digitalWrite(theApp.ledPin, theApp.board.LOW);
                }
            });

        }
    ],
    function(err,result) {

    }

)



