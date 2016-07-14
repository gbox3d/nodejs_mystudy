/**
 * Created by gbox3d on 15. 7. 21..
 */
/**
 * Created by gbox3d on 2014. 6. 29..
 */
var http = require('http');
var util = require('util');
var fs = require('fs');
var os = require('os');
var UrlParser = require('url');

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

//var config = require("./config/config_server_app").config;


var theApp = {
    version : '0.1.1',
    //module_path : '/usr/local/lib/node_modules/',
    module_path : ''
};

var config = {
    ws_net : {
        port : 8080
    }
}

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
theApp.http_server.listen(config.ws_net.port);

console.log('tiny sound play server v ' + theApp.version );
console.log('  start port : '+ config.ws_net.port + ', ready ok!');

//get 처리 해주기
function process_get(req, res){

    var result = UrlParser.parse(req.url,true);

    switch (result.pathname) {
        case '/play-wav':
            var child = exec('aplay ' + result.query.file, function(err, stdout, stderr) {
                if (err) throw err;
                else {
                    //console.log(stdout);
                }
            });

            res.writeHead(200);
            res.end( JSON.stringify( {
                result : 'ok',
                msg : 'play-wav2'
            }));

            break;

        case '/play-mp3':

            if(theApp.mp3_child_process) {
                theApp.mp3_child_process.kill('SIGHUP');
            }

            theApp.mp3_child_process = spawn('mpg321',[result.query.file]);

            res.writeHead(200);
            res.end( JSON.stringify( {
                result : 'ok',
                msg : 'play-mp3'
            }));
            break;
        case '/stop':

            //console.log(theApp.mp3_child_process);

            if(theApp.mp3_child_process) {
                theApp.mp3_child_process.kill('SIGHUP');
            }
            theApp.mp3_child_process = null;
            res.writeHead(200);
            res.end( JSON.stringify( {
                result : 'ok',
                msg : 'stop-mp3'
            }));

            break;
        default :
            res.writeHead(200);
            res.end(JSON.stringify( {
                result : 'ok',
                msg : 'it is tiny sound server ' + theApp.version
            }));
            break;
    }
}

function process_post(req, res){

}