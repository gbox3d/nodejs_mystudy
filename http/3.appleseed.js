/**
 * Created by gunpower on 2016. 6. 17..
 */

var theApp = {
    version : '1.0.0',
    appName : 'AppleSeed',
    module_path : '/usr/local/lib/node_modules/',//config.module_path,
    port : 10010
};

var async = require( theApp.module_path + 'async');

function CreateProcessHandler() {

    var header = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Max-Age': '1000'
    };

    return {
        '/system-info' : function(result,res,context) {
            header['Content-Type'] = 'text/plain';
            res.writeHead(200,header);
            res.end(JSON.stringify( {
                    result : 'ok',
                    msg : theApp.appName + ' Ver.' + theApp.version
                })
            );

        },
        'default' : function (result,res) {
            header['Content-Type'] = 'text/plain'
            res.writeHead(200,header);
            res.end(JSON.stringify( {
                    result : 'ok',
                    msg : 'can not process :' + result.pathname
                })
            );
            console.log('can not process :' + result.pathname )

        }
    }
}

async.waterfall([
        function(next) {

            theApp.ProcessesHandlers = CreateProcessHandler();
            next();

        },
        function (next) {
            var http = require('http');
            var util = require('util');
            var fs = require('fs');
            var os = require('os');
            var UrlParser = require('url');

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

            console.log('log server :' + theApp.port + ',version :' + theApp.version);

//get 처리 해주기
            function process_get(req, res) {
                var result = UrlParser.parse(req.url,true);
                var handler = theApp.ProcessesHandlers[result.pathname];
                if(handler) {
                    handler(result,res,theApp);
                }
                else {
                    theApp.ProcessesHandlers['default'](result,res)
                }

            }

//post 방식으로 처리하기
            function process_post(req, res){

            }

            next();


        },
    ],
    function(err,result) {


        if(err) {
            console.log(err);
        }


        function setup_repl(context) {

            var repl = require('repl');

            var repl_context = repl.start({
                prompt: 'Node.js via stdin> ',
                input: process.stdin,
                output: process.stdout
            }).context;

//콘텍스트객체 설정
//theApp을 repl에서 볼수있다
            repl_context.theApp = context;
        }
        setup_repl(theApp);

    }
);


////////////------------------//////////////////////
