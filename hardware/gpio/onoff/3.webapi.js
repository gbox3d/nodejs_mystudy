/**
 * Created with JetBrains WebStorm.
 * User: gbox3d
 * Date: 13. 3. 13.
 * Time: 오후 6:06
 * To change this template use File | Settings | File Templates.
 *
 * 웹서비스 기본적용 단계 예제
 *
 */

///////////////////////////////////////////
// GPIO

var Gpio = require('../../../../node_pub/node_modules/onoff').Gpio; // Constructor function for Gpio objects.

var led = [new Gpio(4, 'out'),new Gpio(17, 'out'),new Gpio(27, 'out')];
var iv;


// 0.5초 마다 깜박이기
iv = setInterval(function() {
    led[0].writeSync(led[0].readSync() === 0 ? 1 : 0); // 1 = on, 0 = off :)

}, 500);

////////////////////////////////////////////////////////////////
//서버


var http = require('http');
var gPort = 9010;

http.createServer(function (req, res) {


    var ip = req.headers['x-forwarded-for']|| req.connection.remoteAddress;

    console.log('remote address:' + ip);

    res.writeHead(200, {'Content-Type': 'text/plain'});

    if(req.url == '/favicon.ico') {

    }
    else {
        console.log(req.url);


        switch(req.url) {
            case '/go':
                led[1].writeSync(1);
                led[2].writeSync(0);
                res.write('success call api : '+ req.url);
                break;
            case '/back':
                led[1].writeSync(0);
                led[2].writeSync(1);
                res.write('success call api : '+ req.url);
                break;
            case '/stop':
                led[1].writeSync(0);
                led[2].writeSync(0);
                res.write('success call api : '+ req.url);
                break;

            default:
                res.write('error api : '+ req.url);
                break;
        }


    }


    res.end();

}).listen(gPort);


console.log('Server running at : ' + gPort);


////////////////////////////////////////////////////////////////////