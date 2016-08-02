/**
 * Created by gunpower on 2015. 11. 26..
 */


var http = require('http');
var connect = require('/usr/local/lib/node_modules/connect');
var app = connect();

// respond to all requests
app.use(
    (function () {
        var req_count = 0;
        return function(req, res, next) {

            req_count++;
            console.log('req count : ' + req_count);
            console.log('step 1');

            //크로스 도메인 무시
            var header = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Max-Age': '1000'
            };
            header['Content-Type'] = 'text/plain';
            res.writeHead(200,header);

            next();

        }
    })()
);
//-------------------

app.use('/foo', //라우팅
    (function() {
        return function (req,res,next) {
            res.write(" u routed foo ")
            console.log('step 2 for foo');
            next();
        }
    })()
);
//--
app.use('/bar',
    (function() {
        return function (req,res,next) {
            res.write(" u routed bar ")
            console.log('step 2 for bar');
            next();
        }
    })()
);


//-------------------
app.use(
    (function () {
        return function(req, res, next) {

            console.log('step final');
            res.end('Hello from Connect!\n');

        }
    })()
)

var server = http.createServer(app).listen(8000);
console.log('star connect : 8000 port')