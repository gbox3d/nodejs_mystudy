/**
 * Created by gbox3d on 2014. 8. 15..
 */
// var http = require('http');
import http from 'http'
import { URL } from 'url';
// var util = require('util');
// var fs = require('fs');
// var os = require('os');
// var UrlParser = require('url');

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

    // var result = UrlParser.parse(req.url,true);

    console.log(req.url);

    let urlObj = new URL(
        req.url, // url이 상대적인 경로일경우(path만존재) 두번째 인자인 base url을 꼭 지정해주어야한다.
        'http://example.org/' //base url (The base URL to resolve against if the input is not absolute.)
    );

    //크로스 도메인 무시
    var header = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Max-Age': '1000'
    };

    switch (urlObj.pathname) {
        case '/echo':

            header['Content-Type'] = 'text/plain';

            res.writeHead(200,header);

            res.end(JSON.stringify( {
                    result : 'ok',
                    msg : urlObj.searchParams.get('msg')
                }) + '\n'
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