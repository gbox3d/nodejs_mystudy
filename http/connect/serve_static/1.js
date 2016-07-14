/**
 * Created by gunpower on 2015. 11. 26..
 */

var http = require('http')
var connect = require('/usr/local/lib/node_modules/connect')
var serve_static = require('/usr/local/lib/node_modules/serve-static')

var app = connect();

// respond to all requests
//app.use(serve_static('./'))

var serve = serve_static('./');
app.use(serve);

//create node.js http server and listen on port
http.createServer(app).listen(3000);
console.log('now begin static webserver 3000')
