'use strict';

import nodeStatic from 'node-static';
import { URL } from 'url';
import http from 'http';
import fs from 'fs';

const server_port = process.argv[2] ? parseInt(process.argv[2]) : 8000

var fileServer = new (nodeStatic.Server)('./web');
let serverApp = http.createServer((req, res) => {

    // console.log(req.url);

    if (req.url.indexOf('/rest/') == 0) {
        //레스트 콜이면 
        var method = req.method;
        if (method == 'OPTIONS') { //post 처리 s
            method = req.headers['access-control-request-method'];
        }
        else {
        }
        // console.log(method);

        switch (method) {
            case 'GET':
                process_get(req, res);
                break;
            case 'POST':
                process_post(req, res);
                break;
        }
    }
    else {
        //정적웹 서비스 
        fileServer.serve(req, res);
    }

}).listen(server_port, () => {
    console.log(`'server start port ${server_port}'`)
});

async function process_get(req, res) {

    let urlObj = new URL(
        req.url, // url이 상대적인 경로일경우(path만존재) 두번째 인자인 base url을 꼭 지정해주어야한다.
        'http://example.org/' //base url (The base URL to resolve against if the input is not absolute.)
    )

    console.log(urlObj.searchParams.get('name'));
    let _name = urlObj.searchParams.get('name')
    let _number = parseInt(urlObj.searchParams.get('number'));

    let header = {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Max-Age': '1000',
        "Access-Control-Allow-Headers": "*" //CORS 정책 허용  * 는 모두 허용 
    }

    let _rest_path = urlObj.pathname.substring(5)

    switch (_rest_path) {
        case '/get/test':
            res.writeHead(200, header);
            res.end(JSON.stringify({ r: 'ok', msg: `you(${_name}) say hello , number : ${_number}` }));
            break;
        default:
            res.writeHead(200, header);
            res.end(JSON.stringify({ r: 'ok' }));
            break;
    }

}

async function process_post(req, res) {

    // let result = UrlParser.parse(req.url, true);
    let urlObj = new URL(
        req.url, // url이 상대적인 경로일경우(path만존재) 두번째 인자인 base url을 꼭 지정해주어야한다.
        'http://example.org/' //base url (The base URL to resolve against if the input is not absolute.)
    )

    let body_data = []

    // 앞부분 rest/ 빼기
    let _rest_path = urlObj.pathname.substring(5)

    switch (_rest_path) {
        case '/post/test':
            {
                // let uploadName = req.headers['upload-name']
                console.log(req.headers)

                //포스트는 데이터가 조각조각 들어 온다.
                req.on('data', function (data) {
                    //body_data += data;
                    body_data.push(data)
                    console.log(`${data.length}  bytes saved `);
                });

                req.on('end', function () {

                    res.writeHead(200, {
                        'Content-Type': 'text/plain',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST',
                        'Access-Control-Max-Age': '1000',
                        "Access-Control-Allow-Headers": "test-msg" //CORS 정책 허용  * 는 모두 허용 

                    });

                    let _data = Buffer.concat(body_data).toString()

                    let result = { result: 'ok', body: _data + `,msg : ${req.headers['test-msg']} ` }
                    res.end(JSON.stringify(result));

                })
            }
            break;
    }
}



