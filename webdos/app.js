/**
 * Created by gbox3d on 2014. 1. 7..
 */

var http = require('http');



var config = require("./config").config;

var systemCore = require('./lib/system');
var fs_helper = new systemCore.fileSystemHelper({
    root_directory : config.webdos.root
});


var theApp = {
    port : config.webdos.port,
    version : '0.4.0'
}

/*
var gPort = 12800;
var custom_port = process.argv[2];

if(custom_port) {
    gPort = custom_port;
}
*/


http.createServer(function (req, res) {

    try {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        console.log('remote address:' + ip);

    }
    catch(e)
    {
        console.log(e);

    }

    console.log(req.url);

    if (req.method == 'POST') {
        var body_data = '';
        req.on('data',function(data) {
            body_data += data;

        });
        req.on('end', function () {

            //console.log(body_data);

            var req_Obj = JSON.parse(body_data);

            res.writeHead(200, {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Max-Age': '1000'
            });



            switch (req.url) {
                case '/set_passwd':
                    fs_helper.caseSetPasswd(req_Obj, res);
                    /*

                    req_Obj.oldpass : 이전 패스워드 (처음에는 71004)
                    req_Obj.newpass : 새로 고칠패스워드

                    패스워드를 바꿔줍니다.
                     */
                    break;
                case '/save':
                    fs_helper.caseSave(req_Obj, res);
                    /*
                     req_Obj.path :  파일 경로
                     req_Obj.filename : 파일 이름
                     req_Obj.data : 파일 내용
                     req_Obj.pass : 패스워드

                     파일이름이 주어지지않으면 디랙토리를 생성한다. 만약 존재하면 그냥 넘어간다.
                     */
                    break;

                case '/load':
                    fs_helper.caseLoad(req_Obj, res);
                    /*
                    클라이언트에서 전달받은 경로(req_Obj.path)에 있는 파일을 읽어서 값을 반환한다.

                     req_Obj.path :  파일 경로
                     req_Obj.filename : 파일 이름
                     req_Obj.pass : 패스워드
                     res.end('{"result":"ok","data":"파일내용이 여기옵니다."}');
                     */
                    break;
                case '/del':
                    fs_helper.caseDel(req_Obj, res);
                    /*
                     클라이언트에서 전달받은 경로(req_Obj.path)에 있는 파일을 삭제한다.
                     만약 파일이름이 없다면 디랙토리를 삭제한다.

                     req_Obj.path :  파일 경로
                     req_Obj.filename : 파일 이름
                     req_Obj.pass : 패스워드

                     */
                    break;

                case '/catalog':
                    fs_helper.caseCatalog(req_Obj, res);

                    /*
                     경로(req_Obj.path)에 있는 파일 목록을 전달해줍니다.
                     req_Obj.path :  파일 경로                     */


                    //type : 0이면 파일 1이면 디랙토리
                    //res.end('{ "result":"ok","data":[{"name":"파일이름",type:0,size:100}] }');

                    break;
                default :
                    res.end('{"result":"help","data":"copyright (c)goorumefactory 2014, webdos '+ version +', usage [save|load|catalog] "}');
                    break;
            }


        });
    }
    else {

        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': req.method,
            'Access-Control-Max-Age': '1000'
        });

        res.end('{"result":"failed"}');

        console.log(req.method);

    }


}).listen(theApp.port);

console.log('staring web dos version : ' + theApp.version);
console.log('Server running at port : ' + theApp.port);

/*
//////////////////////////////////////////
//정적 웹서버
var connect = require(node_module_path + 'connect');
connect.createServer(connect.static(__dirname)).listen(gPort + 1);

console.log('start static webserver at '+ gPort + 1)
*/