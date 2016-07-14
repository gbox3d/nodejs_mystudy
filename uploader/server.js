/**
 * Created by gbox3d on 2014. 10. 7..
 */

/**
 * Created with JetBrains WebStorm.
 * User: gbox3d
 * Date: 13. 7. 7.
 * Time: 오후 2:57
 * To change this template use File | Settings | File Templates.

 -사용법

 0. 필요한 npm
 sudo npm install formidable -g
 sudo npm install im -g
 sudo npm install async -g

 1. 한번에 하나씩 전송할수있다.

 2. 폼쪽에서 파일을 넘길때는 반드시  이름을 'file' 이라고 해야한다.
 예>
 var fd = new FormData();
 fd.append("file", document.getElementById('fileToUpload').files[0]);


 */

//'/usr/local/lib/node_modules/'

var theApp = {
    version : '1.0.0',
    module_path : '/usr/local/lib/node_modules/',
    port : 8081

};
//command line argument parse
process.argv.forEach(function(val, index, array) {

    //console.log(index + ': ' + val);

    if(val.indexOf('=') > 0) {

        var tokens = val.split('=');

        switch (tokens[0]) {
            case 'port':
                theApp.port = parseInt(tokens[1]);
                break;
            case 'module_path':
                theApp.module_path = tokens[1];
                break;
        }
    }
});


var formidable = require( theApp.module_path +'formidable');
var async = require(theApp.module_path +'async');

var http = require('http');
var util = require('util');
var fs = require('fs');
var os = require('os');
var UrlParser = require('url');



var app = http.createServer(
    function(req, res){

        if(req.url != '/favicon.ico') {

        }
        console.log(req.url);

        try {
            var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

            console.log('remote address:' + ip);

        }
        catch(e)
        {
            console.log(e);

        }

        var method = req.method;
        if(method == 'OPTIONS') {
            method = req.headers['access-control-request-method'];
        }
        else {

        }

        console.log(method);

        switch(method){
            case 'GET':
                process_get(req, res);
                break;
            case 'POST':
                process_post(req, res);
                break;
        }
    }
);
app.listen(theApp.port);

console.log('tiny upload server v ' + theApp.version );
console.log('  start port : '+ theApp.port + ', ready ok!');


//get 처리 해주기
function process_get(req, res){

    var result = UrlParser.parse(req.url,true);

    switch (result.pathname) {
        case '/test':
            fs.readFile(__dirname + '/test.html',
                function (err, data) {
                    if (err) {
                        res.writeHead(500);
                        return res.end('Error loading index.html');
                    }

                    res.writeHead(200);
                    res.end(data);
                });
            break;
        default :
            res.writeHead(200);
            res.end('gunpower file upload system version:' + theApp.version);
            break;
    }


}

function process_post(req, res) {

    var result = UrlParser.parse(req.url,true);

    console.log(result.pathname);

    async.waterfall([
        function(next) { //서버에 파일저장

            var form = new formidable.IncomingForm();

            form.uploadDir = "./uploads"; //업로드할위치 지정
            form.keepExtensions = true; //확장자 이름 써주기

            form
                .on('error', function(err) {
                    throw err;
                })
                .on('field', function(field, value) {
                    //receive form fields here
                })
                /* this is where the renaming happens */
                .on ('fileBegin', function(name, file){
                    //파일이름 바꿔주기
                    file.path = form.uploadDir + "/" + ('_' + (new Date()).getTime() + '_' + file.name);
                })
                .on('file', function(field, file) {
                    //On file received
                })
                .on('progress', function(bytesReceived, bytesExpected) {
                    //self.emit('progess', bytesReceived, bytesExpected)
                    var percent = (bytesReceived / bytesExpected * 100) | 0;
                    process.stdout.write('Uploading: %' + percent + '\r');
                })
                .on('end', function() {


                });

            form.parse(req, function(err, fields, files) {

                var resultObj = {
                    result : 'ok'
                }

                //폰갭 형식
                if(files.file) {
                    resultObj.file_info = {
                        size : files.file.size,
                        path : files.file.path,
                        name : files.file.name,
                        type : files.file.type
                    }

                }

                if(resultObj.file_info) {

                    console.log("Upload completed :" + resultObj.file_info.path);
                    next(null,resultObj);
                }
                else {
                    console.log(files);
                    console.log("Upload completed ");
                    next({msg : 'unkown upload form'},resultObj);
                }

            });

        }

    ],function(error,resultObj) {

        if(error) {
            console.log(JSON.stringify(error));
        }
        else console.log('success comple');
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '1000'
        });


        res.end( JSON.stringify(resultObj));

    });



}



