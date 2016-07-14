/**
 * Created by gbox3d on 15. 5. 20..
 */

var async = require( '/usr/local/lib/node_modules/async');
var firmata = require("firmata");


var theApp = {

};

async.waterfall([
        function(next) {

            var board = new firmata.Board(
                //"/dev/tty.usbserial",
                "/dev/tty.usbmodem1d1171",
                function(err) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("connected");

                console.log("Firmware: " + board.firmware.name + "-" +
                    board.firmware.version.major + "." +
                    board.firmware.version.minor);

                //board.pinMode(13, board.MODES.OUTPUT);
                board.transport.write(new Buffer([0xf4,13,1]));
                board.pinMode(7, board.MODES.OUTPUT);

                theApp.board = board;

                next(null);

            });


        },
        function(next) {

            //firmata 포트 지정 코드체계
            //0~7pin port 0, 8~15pin port 1, 16~23pin port 2 ...

            //포트당 8개의 io가 존재
            //두개의 바이트로 첫번째 바이트에는 0~6번 비트값 두번째 바이트는 7번 비트값이 저장됨
            //순서는 뒤에서부터 계산됨 0번 핀이면1, 1번 2,2번 4, 3번 8,4번 16,5번 32, 6번 64

            //쓰기명령은 상위4비트는 1001(9) 하위4비트에 포트가 번호를 넣음(0~15)
            //13번핀은 포트가1 이므로 0x91 이 됨, 13번째핀은 1포트의 맨오른쪽(8)에서 5번째이므로 0x20(0010 0000),0x00(0000 0000)
            //7번핀은 포트 0 이므로 0x90, 0포트의 맨왼쪽인 8번째 비트에 위치하므로 0x00(0000 0000),0x01(0000 0000)


            console.log('led on');
            //theApp.board.digitalWrite(13, theApp.board.HIGH);
            theApp.board.transport.write(new Buffer([0x91 , 0x20, 0x00])); //13번 포트온
            //theApp.board.transport.write(new Buffer([0x91 , 0x10, 0x00])); //12번핀 온

            setTimeout(function() {
                next(null)
            },1000);


            //next(null);
        },
        function(next) {
            console.log('led off');

            //theApp.board.digitalWrite(7, theApp.board.HIGH);
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