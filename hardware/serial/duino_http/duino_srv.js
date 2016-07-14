/**
 * Created by gbox3d on 14. 11. 17..
 */


var http = require('http');
var util = require('util');
var fs = require('fs');
var os = require('os');
var UrlParser = require('url');

var serialport = require("../../../../../../node_pub/node_modules/serialport");

var baudrate = 9600;

//ls /dev | grep usb
var serialPort = new serialport.SerialPort(
    //"/dev/tty.usbmodem1421", // 맥북용
    //"/dev/ttyACM0",
    //"/dev/ttyAMA0", //UART 씨리얼
    //"/dev/ttyUSB0", // 유에스비 씨리얼 어댑터 인듯
    //"/dev/tty.usbserial-ftE2MR5K",
    "/dev/tty.usbmodem1a1271",
    {
        baudrate: baudrate
        //parser: serialport.parsers.readline("\r\n") //개행문자기준으로 마샬링해주기
    }
);

serialPort.on("open", function () {
    console.log('open at baudrate :' + baudrate);

    //데이터 읽기
    serialPort.on('data', function(data) {
        //console.log(data );
        if(theApp.revCallback) {
            theApp.revCallback(data);
        }

    });

});


var theApp = {
    version : '0.1.1',
    module_path : '',
    port : 8080,
    revCallback : null
};

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
        case '/send2':

            (function() {

                var start = false;
                var buffer = [];
                theApp.revCallback = function(data) {

                    for(var i=0; i< data.length;i++) {

                        if(data[i] == 0x03) {
                            console.log(buffer);
                            theApp.revCallback = null;

                            res.writeHead(200,header);
                            res.end(JSON.stringify( {
                                result : 'ok',
                                buffer : buffer
                            }));

                        }
                        else if(
                            data[i] == 0x02
                        ) { //시작
                            start = true;

                        }
                        else {
                            if(start) {
                                buffer.push(data[i]);
                            }
                        }
                    }
                }

                serialPort.write(result.query.code, function(err, results) {
                    if(err) {
                        console.log('err ' + err);
                    }

                    console.log('results ' + results);
                });

            })();


            break;
        case '/send':

            (function() {

                var start = false;
                var buffer = [];
                theApp.revCallback = function(data) {

                    for(var i=0; i< data.length;i++) {

                        if(data[i] == 0x2e) {
                            console.log(buffer);
                            theApp.revCallback = null;

                            res.writeHead(200,header);
                            res.end(JSON.stringify( {
                                result : 'ok',
                                buffer : buffer
                            }));

                        }
                        else if(
                            data[i] == 0x21 || //'!'
                            data[i] == 0x23 // '#'

                        ) { //시작
                            start = true;

                        }
                        else {
                            if(start) {
                                buffer.push(data[i]);
                            }
                        }
                    }
                }

                serialPort.write(result.query.code, function(err, results) {
                    if(err) {
                        console.log('err ' + err);
                    }

                    console.log('results ' + results);
                });

            })();



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
