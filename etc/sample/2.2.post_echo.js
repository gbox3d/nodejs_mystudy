/**
 * Created by gbox3d on 2014. 2. 28..
 */


var http = require('http');
var fs = require('fs');
var UrlParser = require('url');

var theApp = {
    port :8080
}

//command line argument parse
process.argv.forEach(function(val, index, array) {
    //console.log(index + ': ' + val);

    if(val.indexOf('=') > 0) {

        var tokens = val.split('=');

        if(tokens[0] == 'port') {
            theApp.port = parseInt(tokens[1])
        }

    }


});


http.createServer(function (req, res) {

    try {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        console.log('remote address:' + ip);

    }
    catch(e)
    {
        console.log(e);

    }


    if(req.url != '/favicon.ico') {

        console.log( 'request method :' + req.method);

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

            var result = UrlParser.parse(body_data,true);

            console.log(result);

            res.write(body_data);

            res.end();

        });

    }
    else {
        res.writeHead(404);
        res.end();
    }


}).listen(theApp.port);


console.log('Server running at : ' + theApp.port);
