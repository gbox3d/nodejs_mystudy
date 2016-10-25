/**
 * Created by gunpower on 2016. 10. 25..
 */
// We need this to build our post string
//var querystring = require('querystring');
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

    let post_data = new Buffer("hello world it is post");

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

    // post the data
    //post_req.write("hello \n");
    //post_req.write("fucking \n");
    //post_req.write("world \n");
    // for(let i = 0; i< Buffer.byteLength(post_data);i++) {
    //     let buffer = new Buffer(1);
    //
    //     buffer[0] = post_data[i]
    //
    //     post_req.write( buffer);
    // }

    post_req.write( post_data);


    post_req.end();

}

PostCode()