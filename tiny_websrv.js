/* 
 *
 *
 * simple sample
 *
 * node.js web server
 *
 * by gbox3d, http://cafe.naver.com/goorume
 *
 */


var gVersionString = "0.3.3"

var fs = require('fs');
var http = require('http');


var gPort = 8080;

var custom_port = process.argv[2];

if(custom_port) {
    gPort = custom_port;
}


var server = http.createServer(function(request, response) {
    var url = request.url;
    var file_ext = url.slice(url.lastIndexOf('.'), url.length);

    url = '.' + url;

    if (url == './') {
        fs.readFile('index.html', function(error, data) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
        });
    }
    else {

        //크로스 도메인 무시
        var header = {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Max-Age': '1000'
        };

        switch (file_ext) {
            case '.html':
                fs.readFile(url, function(error, data) {
                    response.writeHead(200, {'Content-Type': 'text/html'});
                    response.end(data);
                });
                break;
            case '.js' :
                fs.readFile(url, function(error, data) {
                    response.writeHead(200, {'Content-Type': 'text/javascript'});
                    response.end(data);
                });
                break;
            case '.css' :
                fs.readFile(url, function(error, data) {
                    response.writeHead(200, {'Content-Type': 'text/css'});
                    response.end(data);
                });
                break;
            case '.jpg' :
                fs.readFile(url, function(error, data) {
                    response.writeHead(200, {'Content-Type': 'image/jpeg'});
                    response.end(data);
                });
                break;
            case '.png' :
                fs.readFile(url, function(error, data) {
                    response.writeHead(200, {'Content-Type': 'image/png'});
                    response.end(data);
                });
                break;
            case '.gif' :
                fs.readFile(url, function(error, data) {
                    response.writeHead(200, {'Content-Type': 'image/gif'});
                    response.end(data);
                });
                break;
            case '.wav':
                fs.readFile(url, function(error, data) {

                    header['Content-Type'] = 'audio/vnd.wave';

                    response.writeHead(200, header);
                    response.end(data);
                });
                break;
            case '.mp3':
                fs.readFile(url, function(error, data) {
                    //response.writeHead(200, {'Content-Type': 'image/gif'});
//                    'audio/mpeg'
                    header['Content-Type'] = 'audio/mpeg';
                    response.writeHead(200, header);
                    response.end(data);
                });
                break;
            default :
                fs.readFile(url, function(error, data) {
                    response.writeHead(200, {'Content-Type': 'multipart/formed-data'});
                    response.end(data);
                });
                break;

        }

    }
});

server.on('connection',function(param) {
    console.log('connection :' + param.server._connections);
});

server.listen(gPort);


console.log('start tiny webserver' + gVersionString +' : ' + gPort);