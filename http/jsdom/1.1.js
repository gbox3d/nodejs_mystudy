/**
 * Created by gbox3d on 2014. 1. 15..
 */


// Run some jQuery on a html fragment
var jsdom = require("/usr/local/lib/node_modules/jsdom");

jsdom.env(
    '<p><a class="the-link" href="https://github.com/tmpvar/jsdom">jsdom\'s Homepage</a></p>',
    ["http://code.jquery.com/jquery.js"],
    function (errors, window) {
        console.log("contents of a.the-link:", window.$("a.the-link").text());
    }
);