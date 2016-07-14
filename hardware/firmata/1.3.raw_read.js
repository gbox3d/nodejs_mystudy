/**
 * Created by gbox3d on 15. 5. 21..
 */

var async = require( '/usr/local/lib/node_modules/async');
//var firmata = require("firmata");
var serialport = require("/usr/local/lib/node_modules/serialport");

//console.log("blink start ...");

var digitalPin = 10;
var analogPin = 0;
var serialPort;
async.waterfall([
        function(next) {
//var firmata = require("firmata");

            var baudrate = 57600;

//ls /dev | grep usb
            serialPort = new serialport.SerialPort(
                "/dev/tty.usbmodem1d1151",
                {
                    baudrate: baudrate
                }
            );

            serialPort.on("open", function () {
                console.log('open at baudrate :' + baudrate);

                //데이터 읽기
                serialPort.on('data', function(data) {
                    console.log(data );
                });

                next(null)

            });

            /*
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
            */


        },
        function(next) {


            //
            //board.pinMode(digitalPin, board.MODES.INPUT);
            serialPort.write(new Buffer([0xf4,10,0]));
            serialPort.write(new Buffer([0xD1,0x4,0]));

            //board.pinMode(analogPin, board.MODES.INPUT);


            //board.digitalRead(digitalPin,function(value) {
            //
            //    console.log('digital read : ' + value);
            //});
            //board.analogRead(analogPin,function(value) {
            //
            //    console.log('analog read : ' + value);
            //});


            next(null);
        }

    ],
    function(err,result) {

        if(!err) {
            console.log('all ok')

        }
    });