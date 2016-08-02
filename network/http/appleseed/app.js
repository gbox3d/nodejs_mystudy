/**
 * Created by gunpower on 2016. 7. 14..
 */

var config = require('./config');

var http = require('http');
var util = require('util');
var fs = require('fs');
var net = require('net');

var os = require('os');
var UrlParser = require('url');

var RestApi = require("./rest_api");



var theApp = {
    system_info : {
        version : '1.0.0',
        name : 'appleseed templ'
    }
};

theApp.rest_api_srv = new RestApi({
    application : theApp
});
