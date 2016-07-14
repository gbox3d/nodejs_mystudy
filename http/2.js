/**
 * Created by gbox3d on 2014. 8. 15..
 */

var http = require('http');
var util = require('util');
var fs = require('fs');
var os = require('os');
var UrlParser = require('url');


var theApp = {
    version : '0.1.1',
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

//post 방식으로 처리하기
//단문전송
// curl -X POST -H Content-Type:application/json -d '{"msg":"hello"}'   http://localhost:8080/echo?test=1234
//인코딩하여 전송
// curl -X POST -H Content-Type:application/json --data-urlencode '{"msg":"post test!#$%^\\/n"}'   http://localhost:8080/echo?test=1234

/*
 $.ajax(
 {
 url: 'http://localhost:8080/echo' ,
 type: 'POST',
 dataType: 'text',
 timeout : 3000,
 data : {msg : encodeURIComponent("post test!@#$%&/\\")},
 success: function(data, textStatus, jqXHR) {

 document.getElementById('text-log').innerText = decodeURIComponent(
 data
 );

 },
 error: function(jqXHR, textStatus) {
 console.log(textStatus);

 },
 complete: function(jqXHR, textStatus, errorThrown) {

 }
 }
 );
 */
function process_post(req, res) {

    var result = UrlParser.parse(req.url,true);

    var body_data = '';

    //포스트는 데이터가 조각조각 들어 온다.
    req.on('data',function(data) {
        body_data += data;
    });

    //데이터를 다 받았으면
    req.on('end', function () {
        res.writeHead(200, {
            'Content-Type': 'text/plain',
//                'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '1000'
        });

        //POST 경우는 파싱전 인코딩된 문자 되돌려야한다.
        body_data = decodeURIComponent(body_data);

        //var result = UrlParser.parse(body_data,true);
        //console.log(result);

        console.log( JSON.parse(body_data) );

        var json_obj = JSON.parse(body_data);

        switch (result.pathname) {
            case '/echo':


                res.end(JSON.stringify( {
                    result : 'ok',
                    msg : json_obj.msg
                }));

                break;

            default :

                res.end(JSON.stringify( {
                    result : 'ok',
                    msg : 'it is http server ' + theApp.version
                }));
                break;
        }

    });
}