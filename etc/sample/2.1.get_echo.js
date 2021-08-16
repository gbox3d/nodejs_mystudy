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

        console.log(req.url);


        //쿼리인자를 쓰기좋게 json으로 파싱한다.
        //쿼리인자들은 json형식으로 된 result.query로 접근할수있다.
        var result = UrlParser.parse(req.url,true);

        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Max-Age': '1000'
        });

        //클라이언틍에서 다음과 같이 테스트 가능함
        //http://localhost:8080/echo?msg=hello

        switch(result.pathname) {
            case "/echo":
                res.write(JSON.stringify(result.query));
                break;
            default:
                res.write("usage : [echo]");
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


