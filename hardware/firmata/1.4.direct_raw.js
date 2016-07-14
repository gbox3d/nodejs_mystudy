/**
 * Created by gbox3d on 15. 5. 21..
 */

//씨리얼포트 직송예제

var async = require( '/usr/local/lib/node_modules/async');
var firmata = require("firmata");
var serialport = require("/usr/local/lib/node_modules/serialport");


var theApp = {

};

async.waterfall([
        function(next) {


            var serialPort = new serialport.SerialPort(
                "/dev/tty.usbmodem1d1151",
                {
                    baudRate: 57600,
                    bufferSize: 1
                }
            );

            serialPort.on("open", function () {
                console.log('open serial' );

                theApp.board = {
                    transport : serialPort
                };

                next(null)

            });


        },
        function(next) {

            var versionReceived = false;

            var ANALOG_MESSAGE = 0xE0;
            var DIGITAL_MESSAGE = 0x90;

            var QUERY_FIRMWARE = 0x79;
            var REPORT_ANALOG = 0xC0;
            var REPORT_DIGITAL = 0xD0;
            var REPORT_VERSION = 0xF9;
            var SAMPLING_INTERVAL = 0x7A;
            var SERVO_CONFIG = 0x70;

            var START_SYSEX = 0xF0;
            var END_SYSEX = 0xF7;

            var STEPPER = 0x72;
            var STRING_DATA = 0x71;
            var SYSTEM_RESET = 0xFF;

            var currentBuffer = [];

            //데이터 읽기
            theApp.board.transport.on('data', function(data) {
                //console.log(data );

                var byt, cmd;

                if (!versionReceived && data[0] !== REPORT_VERSION) {
                    return;
                } else {
                    versionReceived = true;
                }

                for (var i = 0; i < data.length; i++) {
                    byt = data[i];
                    // we dont want to push 0 as the first byte on our buffer
                    if (currentBuffer.length === 0 && byt === 0) {
                        continue;
                    } else {
                        currentBuffer.push(byt);

                        // [START_SYSEX, ... END_SYSEX]
                        if (currentBuffer[0] === START_SYSEX &&
                            //SYSEX_RESPONSE[this.currentBuffer[1]] &&
                            currentBuffer[currentBuffer.length - 1] === END_SYSEX) {

                            if(currentBuffer[1] == QUERY_FIRMWARE) {

                                console.log('query firmware')
                                console.log( currentBuffer[2] + '.' + currentBuffer[3]);

                                next(null);
                            }
                            else {
                                console.log(currentBuffer.toString())
                            }

                            //console.log(currentBuffer);
                            currentBuffer.length = 0;

                        } else if (currentBuffer[0] !== START_SYSEX) {
                            // Check if data gets out of sync: first byte in buffer
                            // must be a valid command if not START_SYSEX
                            // Identify command on first byte
                            cmd = currentBuffer[0] < 240 ? currentBuffer[0] & 0xF0 : currentBuffer[0];

                            // Check if it is not a valid command
                            if (cmd !== REPORT_VERSION && cmd !== ANALOG_MESSAGE && cmd !== DIGITAL_MESSAGE) {
                                // console.log("OUT OF SYNC - CMD: "+cmd);
                                // Clean buffer

                                currentBuffer.length = 0;
                            }
                        }

                        // There are 3 bytes in the buffer and the first is not START_SYSEX:
                        // Might have a MIDI Command
                        if (currentBuffer.length === 3 && currentBuffer[0] !== START_SYSEX) {

                            console.log('midi command :' + currentBuffer)

                            //commands under 0xF0 we have a multi byte command
                            if (currentBuffer[0] < 240) {
                                cmd = currentBuffer[0] & 0xF0;
                            } else {
                                cmd = currentBuffer[0];
                            }

                            switch(cmd) {
                                case REPORT_VERSION: //report version
                                    console.log('report version :' + currentBuffer[1] + '.' + currentBuffer[2])
                                    break;
                            }

                            currentBuffer.length = 0;
                            /////
                        }
                    }
                }
            });

        },
        function(next) {

            theApp.board.transport.write(new Buffer([0xf4,13,1]));
            theApp.board.transport.write(new Buffer([0xf4,10,0])); //인풋모드로 전환
            theApp.board.transport.write(new Buffer([0xd1,1])); //1번포트 스캔활성화

            console.log('led on');
            theApp.board.transport.write(new Buffer([0x91 , 0x20, 0x00])); //13번 포트온

            setTimeout(function() {
                next(null)
            },1000);


            //next(null);
        },
        function(next) {
            console.log('led off');
            theApp.board.transport.write(new Buffer([0x90 , 0x00, 0x01])); //7번핀 온
            setTimeout(function() {
                next(null)
            },1000)


        },
        function(next) {
            theApp.board.transport.write(new Buffer([0x91 , 0x00, 0x00])); // 1포 포트 모두 오프(8~15 pin)
            theApp.board.transport.write(new Buffer([0x90 , 0x00, 0x00])); //0번 포트 모두 오프 (0~7 pin)
            next();

        }
    ],
    function(err,result) {

        if(!err) {
            console.log('all ok')

        }
    });