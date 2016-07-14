/**
 * Created by gbox3d on 2014. 8. 18..
 */

var http = require('http');
var fs = require('fs');
var UrlParser = require('url');

var theApp = {
    port :8080
}

http.createServer(function (req, res) {


    if(req.url != '/favicon.ico') {

        var result = UrlParser.parse(req.url,true);



        switch(result.pathname) {
            case "/old":

                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });

                res.write('<!DOCTYPE html>  <html>' +
                    '<head> <meta charset="utf-8">  <title></title> </head>' +
                    '<body>'
                );

                res.write('<div style="font-size: 24px;color : red;"> 지금 시각은 :' +
                    (new Date()).toLocaleDateString() );
                res.write('<div>');


                res.end('</body> </html>');


                break;
            case "/new":

                res.writeHead(200, {
                    'Content-Type': 'text/plain',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Max-Age': '1000'
                });

                res.end(
                    JSON.stringify( {result :'ok',time : (new Date()).toLocaleDateString()} )
                );

                break;
            default:
                res.write("usage : [old|new]");
                res.end();
                break;
        }

        res.end();
    }
    else {
        res.writeHead(404);
        res.end();
    }


}).listen(theApp.port);


console.log('Server running at : ' + theApp.port);


