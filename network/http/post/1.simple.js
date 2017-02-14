/**
 * Created by gunpower on 2016. 10. 25..
 */

var http = require('http');
var util = require('util');
var fs = require('fs');
var os = require('os');
var UrlParser = require('url');


var theApp = {
    version : '1.0.0',
    module_path : '',
    port : 8080
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

    res.writeHead(200, {
        'Content-Type': 'text/plain',
//                'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Max-Age': '1000'
    });

    switch (result.pathname) {
        case '/test':
            fs.readFile(__dirname + '/' + result.query.file,
                function (err, data) {
                    if (err) {
                        res.writeHead(500);
                        return res.end('Error loading index.html');
                    }

                    res.end(JSON.stringify( {
                            result : 'ok',
                            data : data
                        })
                    );
                });
            break;

        default :
            res.end(JSON.stringify( {
                result : 'ok',
                msg : 'it is http server ' + theApp.version
            }));
            break;
    }
}

function process_post(req, res) {

    var result = UrlParser.parse(req.url,true);

    var body_data = '';

    console.log("incomming post data !");

    //포스트는 데이터가 조각조각 들어 온다.
    req.on('data',function(data) {
        body_data += data;
        console.log(data);
    });

    //데이터를 다 받았으면
    req.on('end', function () {
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '1000'
        });

        //POST 경우는 파싱전 인코딩된 문자 되돌려야한다.
        body_data = decodeURIComponent(body_data);

        console.log("-------------- complete -----------------");
        console.log(body_data)

        res.end(JSON.stringify( {
            result : 'ok',
            msg : 'it is http posy test server ' + theApp.version
        }));

    });
}