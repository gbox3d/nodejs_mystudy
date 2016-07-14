/**
 * Created by gbox3d on 2014. 2. 19..
 * 초미니 레스트풀 예제
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

        //쿼리인자를 파싱하지않는다.
        //var result = UrlParser.parse(req.url);
        //console.log(result);

        //쿼리인자를 쓰기좋게 json으로 파싱한다.
        //쿼리인자들은 json형식으로 된 result.query로 접근할수있다.
        var result = UrlParser.parse(req.url,true);
        //console.log(result);

        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Max-Age': '1000'
        });

        //console.log(req.url);

        switch(result.pathname) {
            case "/echo":
                res.write(JSON.stringify(result.query));
                break;
            case "/save":
                fs.writeFile("./check.json", result.query.msg, function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("The file was saved!");
                    }
                });
                break;
            case "/load":
                fs.readFile('./check.json', function (err, data) {

                    if (err) throw err;
                    console.log(data);

                });
                break;
            default:
                res.write("usage : [echo|save|load]");
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


