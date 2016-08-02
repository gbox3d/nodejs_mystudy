/**
 * Created by gbox3d on 2014. 1. 16..
 */

var module_path = '/usr/local/lib/node_modules/';
var jsdom = require(module_path + "jsdom");

var fs = require("fs");
var jquery = fs.readFileSync("./jquery-2.0.3.min.js", "utf-8");

jsdom.env({
    url: "http://news.ycombinator.com/",
    src: [jquery],
    done: function (errors, window) {
        var $ = window.$;
        console.log("HN Links");
        $("td.title:not(:last) a").each(function () {
            console.log(" -", $(this).text());
        });
    }
});