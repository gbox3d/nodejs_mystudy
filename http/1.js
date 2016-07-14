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