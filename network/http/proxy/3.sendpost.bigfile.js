/**
 * Created by gunpower on 2016. 10. 25..
 */
var http = require('http');
var fs = require('fs');

function PostCode() {
    // Build the post string from an object
    /*var post_data = querystring.stringify({
     'compilation_level' : 'ADVANCED_OPTIMIZATIONS',
     'output_format': 'json',
     'output_info': 'compiled_code',
     'warning_level' : 'QUIET',
     'js_code' : codestring
     });
     */

    var post_data = fs.readFileSync('three.js',{
        encoding : 'utf8'
    });


    //let post_data = new Buffer("hello world it is post");

    // An object of options to indicate where to post to
    var post_options = {
        //host: 'localhost',
        host: '192.168.9.6',
        port: '80',
        path: '/test',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(post_data)
        }
    };

    // Set up the request
    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
    });

    post_req.write( post_data);
    post_req.end();
}

PostCode()