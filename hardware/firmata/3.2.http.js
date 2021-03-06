/**
 * Created by gbox3d on 15. 5. 27..
 */

var http = require('http');
var util = require('util');
var fs = require('fs');
var os = require('os');
var UrlParser = require('url');

var async = require( '/usr/local/lib/node_modules/async');
var firmata = require("firmata");


var theApp = {
    version : '0.1.1',
    module_path : '',
    port : 8080
};

async.waterfall(
    [
        function (next) {

            var ledPin = 13;
            var board = new firmata.Board("/dev/tty.usbmodem1d1141", function(err) {

                if (err) {
                    console.log(err);
                    return;
                }
                console.log("connected");

                console.log("Firmware: " + board.firmware.name + "-" + board.firmware.version.major + "." + board.firmware.version.minor);

                //var ledOn = true;

                board.pinMode(ledPin, board.MODES.OUTPUT);
                next(null);

            });

            theApp.board = board;
            theApp.ledPin = 13;




        },
        function(next) {

            theApp.http_server = http.createServer(
                function(req, res){
                    switch(req.method){
                        case 'GET':
                            process_get(req, res);
                            break;
                        case 'POST':
                            process_post(req, res);
                            break;
                    }
                }
            );
            theApp.http_server.listen(theApp.port);

            console.log('tiny sound play server v ' + theApp.version );
            console.log('  start port : '+ theApp.port + ', ready ok!');

//get 처리 해주기
            function process_get(req, res){

                var result = UrlParser.parse(req.url,true);

                //크로스 도메인 무시
                var header = {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Max-Age': '1000'
                };

                switch (result.pathname) {
                    case '/echo':

                        header['Content-Type'] = 'text/plain';
                        res.writeHead(200,header);

                        res.end(JSON.stringify( {
                                result : 'ok',
                                msg : result.query.msg
                            })
                        );
                        break;
                    case '/led-on':

                        theApp.board.digitalWrite(theApp.ledPin, theApp.board.HIGH);

                        break;
                    case '/led-off':
                        theApp.board.digitalWrite(theApp.ledPin, theApp.board.LOW);
                        break;

                    case '/servo-test':

                        async.waterfall([


                                function(next) {


                                    theApp.board.pinMode(11, theApp.board.MODES.SERVO);
                                    theApp.board.pinMode(10, theApp.board.MODES.SERVO);
                                    theApp.board.pinMode(9, theApp.board.MODES.SERVO);
                                    theApp.board.pinMode(8, theApp.board.MODES.SERVO);

                                    setTimeout(function() {

                                        next(null)
                                    },1000);

                                },
                                function(next) {

                                    theApp.board.servoWrite(11, 0);
                                    theApp.board.servoWrite(10, 0);
                                    theApp.board.servoWrite(9, 0);
                                    theApp.board.servoWrite(8, 0);

                                    setTimeout(function() {

                                        next(null);
                                    },1000);


                                },
                                function(next) {

                                    theApp.board.servoWrite(11, 180);
                                    theApp.board.servoWrite(10, 180);
                                    theApp.board.servoWrite(9, 180);
                                    theApp.board.servoWrite(8, 180);

                                    setTimeout(function() {

                                        next(null);
                                    },1000);


                                },
                                function(next) {

                                    theApp.board.servoWrite(11, 0);
                                    theApp.board.servoWrite(10, 0);
                                    theApp.board.servoWrite(9, 0);
                                    theApp.board.servoWrite(8, 0);

                                    setTimeout(function() {

                                        theApp.board.pinMode(11, theApp.board.MODES.INPUT); //핀모드 서보가 아닌것으로 바꿔주면 서보가 릴리즈된다.
                                        theApp.board.pinMode(10, theApp.board.MODES.INPUT);
                                        theApp.board.pinMode(9, theApp.board.MODES.INPUT); //핀모드 서보가 아닌것으로 바꿔주면 서보가 릴리즈된다.
                                        theApp.board.pinMode(8, theApp.board.MODES.INPUT);

                                        next(null);
                                    },1000);


                                }


                        ],
                        function(err,result) {

                            header['Content-Type'] = 'text/plain';
                            res.writeHead(200,header);

                            if(err) {
                                res.end(JSON.stringify( {
                                        result : err
                                    })
                                );

                            }
                            else {
                                res.end(JSON.stringify( {
                                        result : 'ok'
                                        //msg : result.query.msg
                                    })
                                );
                            }


                        });


                        break;

                    default :
                        header['Content-Type'] = 'text/plain';
                        res.writeHead(200,header);
                        res.end(JSON.stringify( {
                            result : 'ok',
                            msg : 'it is http server ' + theApp.version
                        }));
                        break;
                }
            }

//post 방식으로 처리하기
            function process_post(req, res){

            }

            next(null)
        }

    ],
    function(err,result) {

    }
)