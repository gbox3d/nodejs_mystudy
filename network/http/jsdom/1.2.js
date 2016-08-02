/**
 * Created by gbox3d on 2014. 1. 15..
 */

var module_path = '/usr/local/lib/node_modules/';

var jsdom = require(module_path + "jsdom");

jsdom.env(
    "http://nodejs.org/dist/",
    ["http://code.jquery.com/jquery.js"],
    function (errors, window) {
        console.log("there have been", window.$("a").length, "nodejs releases!");
    }
);