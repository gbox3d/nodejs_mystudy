/**
 * Created by gunpower on 2016. 7. 10..
 */

var config = require("./config")
var http = require('http');
var util = require('util');
var fs = require('fs');
var os = require('os');
var UrlParser = require('url');

var async = require(config.module_path + 'async');
var connect = require( config.module_path + 'connect');
var theConnect = connect();

function Setup(option) {
    var theApp = option.application;

    var resultObj = {

    }

    theConnect.use(
        (function () {
            return function(req, res, next) {
                //크로스 도메인 무시
                var header = {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Max-Age': '1000'
                };
                header['Content-Type'] = 'text/plain';
                res.writeHead(200,header);

                var result = UrlParser.parse(req.url,true);
                //console.log(result);
                resultObj.path = result.path;

                next();

            }
        })()
    );

    theConnect.use('/system-info', //라우팅
        (function() {
            return function (req,res,next) {
                resultObj = theApp.system_info;
                next();
            }
        })()
    );

    theConnect.use(
        (function () {
            return function(req, res, next) {
                console.log('end');
                res.end( JSON.stringify(resultObj) );
            }
        })()
    );

    http.createServer(theConnect).listen(config.net.http.port);
    console.log('rest-api connect : ' + config.net.http.port + ' port');

}

module.exports = Setup;
